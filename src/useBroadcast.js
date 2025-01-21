import mqtt from "mqtt";
import { useEffect, useState } from "react";

export default function useBroadcast() {
  const [connectStatus, setConnectStatus] = useState(null);
  const [payload, setPayload] = useState({});
  const [isSub, setIsSub] = useState(false);
  const [client, setClient] = useState(null);
  const [myTopic, setTopic] = useState("");
  const [myQos, setQos] = useState(0);
  const mqttIdx = 1;
  const mqttConf = [
    {
      host: "ws://mahsites.com:8885/mqtt",
      options: {
        protocol: "ws",
        username: "wsmqtt",
        password: "w5mqtt24.",
        clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        // keepalive: 20,
        keepalive: 160,
        // protocolViersion: 5,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30 * 1000,
      },
    },
    {
      host: "ws://test.mosquitto.org:8080/mqtt",
      options: {
        protocol: "ws",
        clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        // protocolId: "MQTT",
        keepalive: 10,
        // protocolViersion: 5,
        clean: true,
        // reconnectPeriod: 10000,
        // connectTimeout: 30 * 1000,
      },
    },
  ];

  const mqttConnect = (topic, qos = 0) => {
    setConnectStatus("connecting");
    setClient(mqtt.connect(mqttConf[mqttIdx].host, mqttConf[mqttIdx].options));
    setTopic(topic);
    setQos(qos);
  };

  const mqttSub = ({ topic, qos }) => {
    if (client) {
      // const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = ({ topic }) => {
    if (client) {
      // const { topic } = subscription;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  const mqttPub = ({ topic, qos, payload }) => {
    if (client) {
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("Disconnect");
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        mqttSub({ topic: myTopic, qos: myQos });
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const _payload = { topic, message: JSON.parse(message) };
        setPayload(_payload);
        // setPayload(() => {
        //   return {
        //     ...payload, [topic]: { ..._payload }
        //   }
        // });
      });
    }
  }, [client]);

  return {
    client,
    connectStatus,
    isSub,
    payload,
    mqttConnect,
    mqttPub,
    mqttUnSub,
    mqttDisconnect,
  };
}
