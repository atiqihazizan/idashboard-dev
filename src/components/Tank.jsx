import { useEffect, useState } from "react";
import TankSvg from "./TankSvg";

export default function Tank({ title, tanks, tabledata, tid }) {
  const [logTime, setLogTime] = useState("");
  const [tankLevel, setLevel] = useState();
  const [tankTitle, setTitle] = useState();
  const strStatus = ["NOT ACTIVE", "ONLINE", "OFFLINE", "OUT OF RANGE"];
  const colorStatus = [
    "text-[#808080]",
    "text-[#3fff00]",
    "text-[#ff0000]",
    "text-[#ff0000]",
  ];

  useEffect(() => {
    if (tabledata) {
      const _preTank = { ...tankLevel };
      const _title = { ...tankTitle };
      let timeLatest = 0;
      let dateLatest = "";

      tabledata?.forEach(
        ({ BST_DESC, datetime, bstNo, PCT_CAPACITY, ...o }, i) => {
          setLogTime(() => {
            const dt = new Date(datetime);
            if (timeLatest < dt.getTime()) {
              timeLatest = dt.getTime();
              dateLatest = datetime;
            }
            const dateFormat = currDateTime(dateLatest);
            return dateFormat;
          });

          _preTank[bstNo] = PCT_CAPACITY;
          _title[bstNo] = BST_DESC;
        }
      );
      setLevel(_preTank);
      setTitle(_title);
    }
  }, [tabledata]);

  return (
    <table className="trip_table">
      <tbody>
        <tr className="bst_name uppercase">
          <td colSpan="2" align="center">
            <div className="grid grid-cols-3 text-[15pt] font-bold">
              <span className="col-span-2 text-left pl-3">
                CPO BST VOLUME OF <br />
                {title || ""}
              </span>
              <span
                className="text-end pr-3"
                dangerouslySetInnerHTML={{ __html: logTime }}
              />
            </div>
          </td>
        </tr>

        {tanks?.map((t, i) => {
          const def = {
            BST_CAPACITY: 0,
            BST_DESC: 0,
            CURRENT_VOLUME: 0,
            DENSITY: 0,
            ESTIMATE_VOLUME: 0,
            FRAC_VOLUME_LITRES: 0,
            MAIN_VOLUME_LITRES: 0,
            METHOD: 0,
            PCT_CAPACITY: 0,
            bstNo: t,
            datetime: 0,
            height: 0,
            temp: 0,
            type: "HEIGHT",
            status: 0,
          };
          const timestamp = Date.now();
          const idkey = timestamp + i;

          var data = { ...def };
          if (tabledata) {
            const _pre = tabledata.filter((f) => f.bstNo == t)[0] || false;
            if (_pre) {
              data = { ...def, ..._pre };
              data.type =
                data?.METHOD === "U"
                  ? "ULLAGE HEIGHT"
                  : data?.METHOD === "D"
                  ? "DIPPING HEIGHT"
                  : "HEIGHT";
            }
          }
          return (
            <tr key={i}>
              <td className="col_bst_tank w-[200px]">
                {
                  <TankSvg
                    title={tankTitle?.[t]}
                    id={`${tid}${i}`}
                    level={100 - (tankLevel?.[t] || 0)}
                    bstNo={t}
                    vol={tankLevel?.[t]}
                  />
                }
              </td>
              <td className="col_bst_info">
                <table className="bst_info">
                  <tbody>
                    <tr>
                      <td>{data?.type}</td>
                      <td className="text-segment">{data?.height || 0} MM</td>
                    </tr>
                    <tr>
                      <td>TEMPERATURE</td>
                      <td className="text-segment py-05">
                        {data?.temp || 0} &#8451;
                      </td>
                    </tr>
                    <tr>
                      <td className="text-segment font-bold">
                        {data?.ESTIMATE_VOLUME?.toLocaleString() || 0}
                      </td>
                      <td className="text-segment">LT</td>
                    </tr>
                    <tr>
                      <td>STATUS</td>
                      <td
                        className={`py-05 font-100 ${
                          colorStatus[data?.status]
                        }`}
                      >
                        {strStatus[data?.status]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// function RowData({
//   status,
//   bstNo,
//   PCT_CAPACITY,
//   type,
//   height,
//   temp,
//   ESTIMATE_VOLUME,
// }) {
//   const strStatus = ["NOT ACTIVE", "ONLINE", "OFFLINE"];
//   const colorStatus = ["text-[#808080]", "text-[#3fff00]", "text-[#ff0000]"];
//   const [imgTank, setImgTank] = useState(null);

//   useEffect(() => {
//     setImgTank(() => (
//       <TankSvg level={99.9 - PCT_CAPACITY} bstNo={bstNo} vol={PCT_CAPACITY} />
//     ));
//     console.log(bstNo);
//   }, []);

//   return (
//     <tr>
//       <td className="col_bst_tank w-[200px]">
//         {imgTank}
//         {/* <img src={tankSvg} alt="TANK" className="w-full h-full" /> */}
//         {/* <div className="w-full h-full"> */}
//         {/* <TankSvg level={99.9 - PCT_CAPACITY} bstNo={bstNo} vol={PCT_CAPACITY} /> */}
//         {/* </div> */}
//         {/* <span className="bst_no">BST {bstNo || 0}</span> */}
//         {/* <div className="percent_wrapper">{PCT_CAPACITY || 0}%</div> */}
//       </td>
//       <td className="col_bst_info">
//         <table className="bst_info">
//           <tbody>
//             <tr>
//               <td>{type}</td>
//               <td className="text-segment">{height || 0} M</td>
//             </tr>
//             <tr>
//               <td>TEMPERATURE</td>
//               <td className="text-segment py-05">{temp || 0} &#8451;</td>
//             </tr>
//             <tr>
//               <td className="text-segment font-bold">
//                 {ESTIMATE_VOLUME?.toLocaleString() || 0}
//               </td>
//               <td className="text-segment">LT</td>
//             </tr>
//             <tr>
//               <td>STATUS</td>
//               <td className={`py-05 font-100 ${colorStatus[status]}`}>
//                 {strStatus[status]}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </td>
//     </tr>
//   );
// }
