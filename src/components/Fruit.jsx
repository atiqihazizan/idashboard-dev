import { useEffect, useState } from "react";
import FruitSvg from "./FruitSvg";
import TruckSvg from "./TruckSvg";

export default function Fruit({
  fid,
  title,
  currTime,
  data,
  total,
  y2t,
  m2t,
  status,
}) {
  const myDisp = Object.keys(data);

  return (
    <table className="trip_table">
      <tbody>
        <tr className="bst_name uppercase">
          <td colSpan="4" align="center">
            <div className="grid grid-cols-3 text-[15pt] font-bold">
              <span className="col-span-2 text-left pl-3">
                CROP RECEIVED
                <br />
                {title || ""}
              </span>
              <span
                className="text-end pr-0"
                dangerouslySetInnerHTML={{ __html: currTime }}
              />
            </div>
          </td>
        </tr>

        <tr className="">
          <td className="text-[13pt] w-[20%]"></td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-[13pt] w-[30%]">
              {data[d].label}
            </td>
          ))}
        </tr>
        <tr>
          <td>
            {/* <img src={fruitSvg} width="100%" /> */}
            <FruitSvg id={fid} isActive={status} />
          </td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-segment text-[20pt]">
              {data[d].nett} <span className="text-sm">KG</span>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            {/* <img src={TruckSvg} width="100%" /> */}
            <TruckSvg isActive={status} />
          </td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-segment text-[20pt]">
              {data[d].trip} <span className="text-sm">TRIP</span>
            </td>
          ))}
        </tr>

        <tr className="text-segment">
          <td colSpan="2" className="text-monospace">
            TOTAL WEIGHT
          </td>
          <td className="text-[20pt]">{total || ""} </td>
          <td className="font-bold">MT</td>
        </tr>
        <tr className="text-segment">
          <td colSpan="2" className="text-monospace">
            MONTH TO DATE
          </td>
          <td className="text-[20pt]">{m2t || ""} </td>
          <td className="font-bold"></td>
        </tr>
        <tr className="text-segment">
          <td colSpan="2" className="text-monospace">
            YEAR TO DATE
          </td>
          <td className="text-[20pt]">{y2t || ""} </td>
          <td className="font-bold"></td>
        </tr>
      </tbody>
    </table>
  );
}
