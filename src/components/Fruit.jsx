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
  // const myDisp = Object.keys(data);
  const myDisp = ["I", "E", "C"];
  return (
    <table className="trip_table">
      <tbody>
        <tr className="bst_name uppercase">
          <td colSpan="4" align="center" className="py-2 md:py-3">
            <div className="grid grid-cols-3 text-sm sm:text-base md:text-[15pt] font-bold">
              <span className="col-span-2 text-left pl-2 md:pl-3">
                {title || ""}
              </span>
              <span
                className="text-end pr-0 text-xs sm:text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: currTime }}
              />
            </div>
          </td>
        </tr>

        <tr className="py-2">
          <td className="text-xs sm:text-sm md:text-[13pt] w-[20%] py-2"></td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-xs sm:text-sm md:text-[13pt] w-[30%] py-2">
              {data[d].label}
            </td>
          ))}
        </tr>
        <tr>
          <td className="py-2 md:py-3">
            <FruitSvg id={fid} isActive={status} />
          </td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-segment text-sm sm:text-lg md:text-[20pt] py-2 md:py-3">
              {data[d].nett} <span className="text-xs sm:text-sm">KG</span>
            </td>
          ))}
        </tr>
        <tr>
          <td className="py-2 md:py-3">
            <TruckSvg isActive={status} />
          </td>
          {myDisp.map((d, i) => (
            <td key={i} className="text-segment text-sm sm:text-lg md:text-[20pt] py-2 md:py-3">
              {data[d].trip} <span className="text-xs sm:text-sm">TRIP</span>
            </td>
          ))}
        </tr>
        <tr className="border-t-2 border-black">
          <td colSpan="2" className="text-xs sm:text-sm md:text-base py-2">
            TOTAL WEIGHT
          </td>
          <td className="text-sm sm:text-lg md:text-[20pt] py-2">{total || ""}</td>
          <td className="font-bold text-xs sm:text-sm py-2">MT</td>
        </tr>
        <tr className="text-segment">
          <td colSpan="2" className="text-xs sm:text-sm md:text-base py-2">
            MONTH TO DATE
          </td>
          <td className="text-sm sm:text-lg md:text-[20pt] py-2">{m2t || ""}</td>
          <td className="font-bold py-2"></td>
        </tr>
        <tr className="text-segment">
          <td colSpan="2" className="text-xs sm:text-sm md:text-base py-2">
            YEAR TO DATE
          </td>
          <td className="text-sm sm:text-lg md:text-[20pt] py-2">{y2t || ""}</td>
          <td className="font-bold py-2"></td>
        </tr>
      </tbody>
    </table>
  );
}
