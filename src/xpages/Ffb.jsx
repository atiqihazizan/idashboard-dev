import { useEffect, useState } from "react";
// import { mills } from "../assets/conf.json";
import Fruit from "../components/Fruit";

const ffbSocket = mqSocket();
ffbSocket.init(`thp/ffb/#`);

export default function FFB() {
  const [dataCrop, setData] = useState(() =>
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
          status: "ONLINE",
        },
      }),
      {}
    )
  );

  ffbSocket.onReceived(({ topic, message }) => {
    let total = 0,
      currDate;
    const _topic = topic.replace("thp/ffb/", "");
    const _table = message.Table1;
    const _data = { ...dataCrop };

    if (_data[_topic] == undefined) return;

    const _disp = Object.keys(_data[_topic].data);

    const newData = _disp.reduce(
      (acc, curr) =>
        (acc = {
          ...acc,
          [curr]: (() => {
            const _o = _data[_topic].data[curr];
            return {
              ..._o,
              ..._table
                .filter((item, idx) => item.DrCrSubType == curr)
                .reduce((a, c) => {
                  const _nett = c.Nett * 1000;
                  const _trip = parseInt(c.Trip);
                  currDate = currDateTime(c.DateQry);
                  total += _nett;
                  return (a = {
                    ...a,
                    nett: _nett + (a?.nett || 0),
                    trip: _trip + (a?.trip || 0),
                  });
                }, {}),
            };
          })(),
        }),
      {}
    );
    _data[_topic] = {
      ..._data[_topic],
      data: newData,
      total: (total / 1000)?.toFixed(2),
      currTime: currDate,
    };

    if (!objectEmpty(_table)) setData(_data);
  });

  return mills.map(({ topic }, i) => <Fruit key={i} {...dataCrop[topic]} />);
}
