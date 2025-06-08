// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// The device connection string to authenticate the device with your IoT hub.
//
// NOTE:
// For simplicity, this sample sets the connection string in code.
// In a production environment, the recommended approach is to use
// an environment variable to make it available to your application
// or use an HSM or an x509 certificate.
// https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
const connectionString = 'HostName=my-first-hub-iot.azure-devices.net;DeviceId=my-first-device;SharedAccessKey=2pt73z1gm9Mu485JiYq8hufRGLXJGENoUdln/s2u+gk=';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
//   Run 'npm install azure-iot-device-mqtt' to install the required libraries for this application
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
const { Mqtt } = require('azure-iot-device-mqtt');
const DeviceClient = require('azure-iot-device').Client;
const { Message } = require('azure-iot-device');

const client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// Print results.
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(`${op} error: ${err.toString()}`);
    if (res) console.log(`${op} status: ${res.constructor.name}`);
  };
}

// Create a message and send it to the IoT hub every second
setInterval(() => {
  // Simulate telemetry.
  const temperature = 20 + (Math.random() * 15);
  const humidity = 60 + (Math.random() * 20);

  // Add the telemetry to the message body.
  const data = JSON.stringify({ temperature, humidity });
  const message = new Message(data);

  // Add a custom application property to the message.
  // An IoT hub can filter on these properties without access to the message body.
  message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
  console.log(`Sending message: ${message.getData()}`);

  // Send the message.
  client.sendEvent(message, printResultFor('send'));
}, 1000);