var mqSocket = () => {
  var client;

  function MQTTConnect(topic) {
    const clientID = uuidv4(); //  "thp" + 1; //"clientID - " + parseInt(Math.random() * 100);
    const host = "178.128.48.114"; // "test.mosquitto.org";
    const port = "8885"; //"8080";
    const user = "wsmqtt";
    const pass = "w5mqtt24.";

    // console.log(`Connection to ${host} on port ${port}`);
    console.log(`Using the cliend Id ${clientID}`);

    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    // client.onMessageArrived = onMessageArrived;

    client.connect({
      useSSL: false,
      userName: user,
      password: pass,
      cleanSession: false,
      onFailure: onFailure,
      keepAliveInterval: 30,
      // reconnect: true, // Enable automatic reconnect
      onSuccess: () => client.subscribe(topic),
    });
  }

  function onFailure(error) {
    console.log("Connection failed: " + error.errorMessage);
  }
  function onConnectionLost(responseObject) {
    console.error("ERROR: Connection is lost..");
    if (responseObject != 0)
      console.error("ERROR: " + responseObject.errorMessage);
  }

  function onMessageArrived(message) {
    // console.log("OnMessageArrived: " + message.payloadString);
    // console.log("Topic: " + message.destinationName);
    console.log("Message: " + message.payloadString);
  }

  function onDisconnect() {}

  function publishMessage() {}

  function uuidv4() {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return "xxxxxxxx2024xxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  return {
    init: MQTTConnect,
    onReceived: (callback) => {
      client.onMessageArrived = ({ payloadString, qos, destinationName }) =>
        callback({
          topic: destinationName,
          message: JSON.parse(payloadString),
        });
    },
  };
};
