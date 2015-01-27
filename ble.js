var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

var ws = require("nodejs-websocket");
var port = 3000;

// INSERT TESSEL IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
var connection = ws.connect('ws://nikolai.evennode.com:' + port, function() {
  // When we connect to the server, send some catchy text
  connection.sendText("My milkshake brings all the boys to the yard")
});

// When we get text back
connection.on('text', function(text) {
  // print it out
  console.log("Echoed back from server:", text);
})


ble.on('ready', function () {
  // Initial scan for devices
  scan();
});

// When a device is discovered
ble.on('discover', function(peripheral) {
  deviceID = peripheral.address._str;
  console.log('Found device:', deviceID);
  devices.push({id: deviceID});
});

// Scan for devices regularly
function poll() {
  setTimeout(scan, 5000);
}

// Check and see if authed devices in range
function scan () {
  // Reset found devices
  devices = [];
  console.log('Scanning...');
  ble.startScanning();
  noneFound = setTimeout(function () {
    ble.stopScanning();
    // Check for changes
    poll();
  }, timeout);
}
