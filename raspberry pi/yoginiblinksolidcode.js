var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var LED2 = new Gpio(6, 'out');
var button = new Gpio(3, 'in');
var blinkInterval = setInterval(blinkLED, 250);

function blinkLED() {
    if (button.readSync() == 0) 
        LED.writeSync(1);
    else {
        LED.writeSync(0);
    }
}

function solidLED() {
    if (button.readSync() == 0) {
        LED2.writeSync(1);
    }
}

function endBlink() {
    clearInterval(blinkInterval);
    LED.writeSync(0);
}

setTimeout(endBlink, 5000);