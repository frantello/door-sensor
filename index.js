"use strict";

var LED_PIN = 13;
var BUTTON_PIN = 2;

var http = require("http");
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});
var button;
var led;

board.on("ready", function() {
	console.log("Ready!");

  button = new five.Button({
    pin: BUTTON_PIN,
    isPullup: true
  });

  led = new five.Led(LED_PIN);

  button.on("down", function() {
  	console.log("close");
    led.off();
  });

  button.on("up", function() {
   	console.log("open");
    led.on();
  });

/*
	button.on("hold", function() {
    console.log("hold");
  });
*/

  board.repl.inject({
    button: button,
    led: led
  });

});

var server = http.createServer(function(req, res) {
	if (board.pins[BUTTON_PIN].value === 1) {
  	res.end("PUERTA ABIERTA, PELIGRO!");
  } else {
  	res.end("PUERTA CERRADA");
  }
});

var port = 8080;
server.listen(port);
