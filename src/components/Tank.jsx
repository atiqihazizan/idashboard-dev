import { useEffect, useState } from "react";
import TankSvg from "./TankSvg";

export default function Tank({ title, tanks, tabledata, tid }) {
  const [logTime, setLogTime] = useState("");
  const [tankLevel, setLevel] = useState();
  const [tankTitle, setTitle] = useState();
  // const strStatus = ["N/A", "ONLINE", "OFFLINE", "OUT OF RANGE"];
  const strStatus = ["N/A", "ONLINE", "OFFLINE", "N/A"];
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
            return dateLatest;
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
            <div className="grid grid-cols-3 text-sm sm:text-base md:text-[15pt] font-bold">
              <span className="col-span-2 text-left pl-2 md:pl-3">
                {title || ""}
              </span>
              <span
                className="text-end pr-0 text-xs sm:text-sm md:text-base"
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
              <td className="col_bst_tank min-w-[112px] ">
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
                <table className="w-full space-y-2 md:space-y-3">
                  <tbody>
                    <tr>
                      <td className="text-xs sm:text-sm md:text-base pb-1 md:pb-2">VOLUME</td>
                      <td className="text-segment text-sm sm:text-lg md:text-[1.5rem] pb-1 md:pb-2">
                        {data?.ESTIMATE_VOLUME?.toLocaleString() || 0} LT
                      </td>
                    </tr>
                    <tr>
                      <td className="text-xs sm:text-sm md:text-base pb-1 md:pb-2">HEIGHT</td>
                      <td className="text-segment text-sm sm:text-lg md:text-[1.5rem] pb-1 md:pb-2">
                        {data?.height || 0} MM
                      </td>
                    </tr>
                    <tr>
                      <td className="text-xs sm:text-sm md:text-base pb-1 md:pb-2">TEMP</td>
                      <td className="text-segment text-sm sm:text-lg md:text-[1.5rem] pb-1 md:pb-2">
                        {data?.temp || 0} &#8451;
                      </td>
                    </tr>
                    <tr>
                      <td className="text-xs sm:text-sm md:text-base">STATUS</td>
                      <td className={`py-1 md:py-2 font-medium ${colorStatus[data?.status]}`}>
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
