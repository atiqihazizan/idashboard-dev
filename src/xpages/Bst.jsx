import { useEffect, useState } from "react";
// import { mills } from "../assets/conf.json";
import Tank from "../components/Tank";

const bstSocket = mqSocket();
bstSocket.init(`thp/bst/#`);

export default function BST() {
  // const [dataCPO, setData] = useState(() =>
  //   mills.reduce(
  //     (p, { topic, ...e }) => ({
  //       ...p,
  //       [topic]: {
  //         ...e,
  //         tabledata: false,
  //       },
  //     }),
  //     {}
  //   )
  // );

  // bstSocket.onReceived(({ topic, message: newData }) => {
  //   const _topic = topic.replace("thp/bst/", "");
  //   const _data = { ...dataCPO };
  //   const _preData = _data[_topic].tabledata;

  //   if (_preData === false) _data[_topic].tabledata = [newData];
  //   if (_preData) {
  //     let chkUpdate = false;

  //     _data[_topic].tabledata = _preData.map((p) => {
  //       const o = newData.bstNo == p.bstNo || false;
  //       if (o) {
  //         chkUpdate = true;
  //         return newData;
  //       }
  //       return p;
  //     });

  //     if (chkUpdate == false) _data[_topic].tabledata.push(newData);
  //   }
  //   // console.log(newData, _data);
  //   if (!objectEmpty(newData)) setData(_data);
  // });

  return mills.map(({ topic }, i) => <Tank key={i} {...dataCPO[topic]} />);
}
