import { useEffect, useRef, useState } from "react";

export default function useReload({}) {
  const [isLoading, setLoading] = useState(false);
  const [getOutdoor, setOutdoor] = useState({});
  const [getIndoor, setIndoor] = useState({});
  const [getSolarUvi, setSolarUvi] = useState({});
  const [getRainfall, setRainfall] = useState({});
  const [getPressure, setPressure] = useState({});
  const [getWind, setWind] = useState({});
  const isFirstRender = useRef(true);
  const param = {
    application_key: "48A21444FC3644295F4E9215606BF2BB",
    api_key: "00817211-3d5f-4f21-87a8-759fe2657f01",
    mac: "48:E7:29:5E:C5:08",
    call_back: "all",
    temp_unitid: 1, // default 2:F 1:C
    pressure_unitid: 4, // default 4:inHg
    wind_speed_unitid: 6, // default 9:mph 6:m/s
    rainfall_unitid: 13, // default 13:in
    solar_irradiance_unitid: 16, // default 16:W/m2
  };
  // const url =
  //   "https://api.ecowitt.net/api/v3/device/real_time?application_key=48A21444FC3644295F4E9215606BF2BB&api_key=00817211-3d5f-4f21-87a8-759fe2657f01&mac=48:E7:29:5E:C5:08&call_back=all";

  const urlApi = "https://api.ecowitt.net/api/v3/device/real_time";
  const urlPara = Object.keys(param)
    .reduce((p, c) => {
      p = [...p, `${c}=${param[c]}`];
      return p;
    }, [])
    .join("&");
  const url = `${urlApi}?${urlPara}`;

  useEffect(() => {
    async function fetchData() {
      let data = null;

      if (isFirstRender.current && localStorage.getItem("ecowitt")) {
        data = JSON.parse(localStorage.getItem("ecowitt"));
        isFirstRender.current = false;
      } else {
        setLoading(true);
        const req = await fetch(url);
        const { data: getjson } = await req.json();
        data = getjson;
        localStorage.setItem("ecowitt", JSON.stringify(getjson));
      }

      if (Object.keys(data).length > 0) {
        const { indoor, outdoor, pressure, rainfall, solar_and_uvi, wind } =
          data;
        setIndoor(indoor);
        setOutdoor(outdoor);
        setSolarUvi(solar_and_uvi);
        setRainfall(rainfall);
        setPressure(pressure);
        setWind(wind);
      }
      setTimeout(() => {
        fetchData();
      }, 5000);
    }
    fetchData();
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  return {
    getOutdoor,
    getIndoor,
    getSolarUvi,
    getRainfall,
    getPressure,
    getWind,
  };
}
