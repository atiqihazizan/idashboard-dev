import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Tank from "./components/Tank";
import Fruit from "./components/Fruit";

const bstSocket = mqSocket();
const ffbSocket = mqSocket();
bstSocket.init(`thp/bst/#`);
ffbSocket.init(`thp/ffb/#`);

function App() {
  const [searchParams] = useSearchParams();
  const getPage = searchParams.get("page");
  const [dataCrop, setDataCrop] = useState(() =>
    mills.reduce(
      (p, { topic, title }) => ({
        ...p,
        [topic]: {
          title,
          currTime: "",
          data: {
            I: { label: "OWN", nett: 0, trip: 0 },
            E: { label: "OUTSIDE", nett: 0, trip: 0 },
            C: { label: "CORELATED", nett: 0, trip: 0 },
          },
          total: 0,
          y2t: 0,
          m2t: 0,
          status: 0,
        },
      }),
      {}
    )
  );
  const [dataCPO, setDataCPO] = useState(() =>
    mills.reduce(
      (p, { topic, ...e }) => ({
        ...p,
        [topic]: { ...e, tabledata: false },
      }),
      {}
    )
  );

  ffbSocket.onReceived(({ topic, message }) => {
    const _topic = topic.replace("thp/ffb/", "");
    const _table = message.Table1;
    const _sum = message.sum;
    const _total = message.total;
    const _date = currDateTime(message.currDate);
    const _data = { ...dataCrop };

    if (_data[_topic] == undefined) return;
    _data[_topic] = {
      ..._data[_topic],
      data: _sum,
      total: _total,
      currTime: _date,
      status: 1,
    };

    if (!objectEmpty(_table)) {
      localStorage.setItem("dashboard_ffb", JSON.stringify(_data));
      setDataCrop(_data);
    }
  });

  bstSocket.onReceived(({ topic, message: newData }) => {
    const _topic = topic.replace("thp/bst/", "");
    const _data = { ...dataCPO };
    const _preData = _data[_topic]?.tabledata;

    if (_preData === false) _data[_topic].tabledata = [newData];
    if (_preData) {
      let chkUpdate = false;

      _data[_topic].tabledata = _preData.map((p) => {
        const o = newData.bstNo == p.bstNo || false;
        if (o) {
          chkUpdate = true;
          return newData;
        }
        return p;
      });

      if (chkUpdate == false) _data[_topic].tabledata.push(newData);
    }
    if (!objectEmpty(newData)) {
      localStorage.setItem("dashboard_bst", JSON.stringify(_data));
      setDataCPO(_data);
    }
  });

  useEffect(() => {
    const localDate = localStorage.getItem("dashboard_datenow");
    const localFFB = localStorage.getItem("dashboard_ffb");
    const localBST = localStorage.getItem("dashboard_bst");

    // if (localDate !== dateTimeNow()) {
    //   localStorage.removeItem("dashboard_ffb");
    //   localStorage.removeItem("dashboard_bst");
    // } else {
    // }

    // if (localFFB) setDataCrop(JSON.parse(localFFB));
    // if (localBST) setDataCPO(JSON.parse(localBST));

    localStorage.setItem("dashboard_datenow", dateTimeNow());
  }, []);
  return (
    <div className="flex flex-col">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 grid-auto-rows-max-h-300 ${
          getPage === "ffb" ? "block" : "hidden"
        }`}
      >
        {mills.map(({ topic }, i) => (
          <Fruit key={i} fid={i} {...dataCrop[topic]} />
        ))}
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 grid-auto-rows-max-h-300 ${
          getPage === "bst" ? "block" : "hidden"
        }`}
      >
        {mills.map(({ topic }, i) => (
          <Tank key={i} tid={i} {...dataCPO[topic]} />
        ))}
      </div>
    </div>
  );
}

export default App;
