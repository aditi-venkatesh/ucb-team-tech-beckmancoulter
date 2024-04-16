// Import the 'onoff' library to control GPIO pins
const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const solidLED_D1 = new Gpio(4, 'out');    // First LED connected to GPIO pin 4, set as output
const solidLED_D2 = new Gpio(7, 'out');
const blinkLED_D1 = new Gpio(6, 'out');   // Second LED connected to GPIO pin 6, set as output
const blinkLED_D2 = new Gpio(8, 'out');
const solid_D1 = new Gpio(3, 'in'); // First button connected to GPIO pin 3, set as input
const solid_D2 = new Gpio(10, 'in');
const blinking_D1 = new Gpio(5, 'in'); // Second button connected to GPIO pin 5, set as input
const blinking_D2 = new Gpio(11, 'in');
const off_D1 = new Gpio(12, 'in'); // Third button connected to GPIO pin 7, set as input
const off_D2 = new Gpio(13, 'in');

// Function to turn off both LEDs
function turnOffLEDs() {
    solidLED_D1.writeSync(0);
    solidLED_D2.writeSync(0);
    blinkLED_D1.writeSync(0);
    blinkLED_D2.writeSync(0);
}

// Event listener for the first solid button to toggle solid state for both LEDs
solid_D1.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        solidLED_D1.writeSync(1);
        solidLED_D2.writeSync(1);
        blinkLED_D1.writeSync(0);
        blinkLED_D2.writeSync(0);
    }
});

// Event listener for the second solid button to toggle solid state for both LEDs
solid_D2.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        solidLED_D1.writeSync(1);
        solidLED_D2.writeSync(1);
        blinkLED_D1.writeSync(0);
        blinkLED_D2.writeSync(0);
    }
});

// Event listener for the first blinking button to toggle blinking state for both LEDs
blinking_D1.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        blinkLED_D1.writeSync(1);
        blinkLED_D2.writeSync(1);
        solidLED_D1.writeSync(0);
        solidLED_D2.writeSync(0);
    }
});

// Event listener for the second blinking button to toggle blinking state for both LEDs
blinking_D2.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        blinkLED_D1.writeSync(1);
        blinkLED_D2.writeSync(1);
        solidLED_D1.writeSync(0);
        solidLED_D2.writeSync(0);
    }
});

// Event listener for the first off button to turn off both LEDs
off_D1.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        turnOffLEDs();
    }
});

// Event listener for the second off button to turn off both LEDs
off_D2.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        turnOffLEDs();
    }
});

// Clean up GPIO resources on program exit
process.on('SIGINT', () => {
    turnOffLEDs();
    solidLED_D1.unexport();
    solidLED_D2.unexport();
    blinkLED_D1.unexport();
    blinkLED_D2.unexport();
    solid_D1.unexport();
    solid_D2.unexport();
    blinking_D1.unexport();
    blinking_D2.unexport();
    off_D1.unexport();
    off_D2.unexport();
});