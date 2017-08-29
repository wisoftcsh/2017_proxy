/**
 * Created by choiseonho on 2017. 6. 1..
 */
const request = require('request');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://203.230.100.156');

client.on('connect', function () {
  console.log("connect MQTT");
  client.subscribe('homeSensor');
});

client.on('message', function (topic, message) {
  console.log("topic : " + topic);
  console.log("post : " + message);
  // message is Buffer
  let sensing = message.toString().split('#');
  console.log(sensing);

  for (let i = 0; i < sensing.length-1; i += 2) {
    request({
      // HTTP Archive Request Object
      har: {
        url: 'http://localhost:8080/sensing/add',
        method: 'POST',
        headers: [
          {
            name: 'content-type',
            value: 'application/x-www-form-urlencoded'
          }
        ],
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            {
              name: 'sensorId',
              value: sensing[i]
            },
            {
              name: 'sensingValue',
              value: sensing[i+1]
            }
          ]
        }
      }
    });
  }
  // client.end();
});