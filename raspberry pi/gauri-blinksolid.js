const GPIO = require('GPIO');

const notifyingButtonPin = 17; 
const acknowledgingButtonPin = 18;
const completionButtonPin = 19; 
const ledPin = 20; 

const notifyingButton = new GPIO(notifyingButtonPin, 'in');
const acknowledgingButton = new GPIO(acknowledgingButtonPin, 'in');
const completionButton = new GPIO(completionButtonPin, 'in');
const led = new GPIO(ledPin, 'out');

let blinkInterval;

function blinkLED() {
    blinkInterval = setInterval(() => {
        led.writeSync(led.readSync() === 0 ? 1 : 0); // Toggle LED state
    }, 500); // Blink interval (ms)
}

// Function to make LED stay solid
function solidLED() {
    clearInterval(blinkInterval);
    led.writeSync(1); 
}

function turnOffLED() {
    clearInterval(blinkInterval);
    led.writeSync(0); 
}

setInterval(() => {
    const notifyingButtonState = notifyingButton.readSync();
    const acknowledgingButtonState = acknowledgingButton.readSync();
    const completionButtonState = completionButton.readSync();

    if (notifyingButtonState === 1) {
        blinkLED();
    } else if (acknowledgingButtonState === 1) {
        solidLED();
    } else if (completionButtonState === 1) {
        turnOffLED();
    }
}, 100); // Check button states every 100ms
