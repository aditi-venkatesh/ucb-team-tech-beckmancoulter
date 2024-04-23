// Import the 'onoff' library to control GPIO pins
const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const solidLED_filling = new Gpio(4, 'out');    // First LED connected to GPIO pin 4, set as output
const solidLED_glass = new Gpio(7, 'out');
const blinkLED_filling = new Gpio(6, 'out');   // Second LED connected to GPIO pin 6, set as output
const blinkLED_glass = new Gpio(8, 'out');
const solid_filling = new Gpio(3, 'in'); // First button connected to GPIO pin 3, set as input
const solid_glass = new Gpio(10, 'in');
const blinking_filling = new Gpio(5, 'in'); // Second button connected to GPIO pin 5, set as input
const blinking_glass = new Gpio(11, 'in');
const off_filling = new Gpio(12, 'in'); // Third button connected to GPIO pin 7, set as input
const off_glass = new Gpio(13, 'in');

// Function to turn off both LEDs
function turnOffLEDs() {
    solidLED_filling.writeSync(0);
    solidLED_glass.writeSync(0);
    blinkLED_filling.writeSync(0);
    blinkLED_glass.writeSync(0);
}

// Event listener for the first solid button to toggle solid state for both LEDs
solid_filling.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        solidLED_filling.writeSync(1);
        solidLED_glass.writeSync(1);
        blinkLED_filling.writeSync(0);
        blinkLED_glass.writeSync(0);
    }
});

// Event listener for the second solid button to toggle solid state for both LEDs
solid_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        solidLED_filling.writeSync(1);
        solidLED_glass.writeSync(1);
        blinkLED_filling.writeSync(0);
        blinkLED_glass.writeSync(0);
    }
});

// Event listener for the first blinking button to toggle blinking state for both LEDs
blinking_filling.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        blinkLED_filling.writeSync(1);
        blinkLED_glass.writeSync(1);
        solidLED_filling.writeSync(0);
        solidLED_glass.writeSync(0);
    }
});

// Event listener for the second blinking button to toggle blinking state for both LEDs
blinking_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        blinkLED_filling.writeSync(1);
        blinkLED_glass.writeSync(1);
        solidLED_filling.writeSync(0);
        solidLED_glass.writeSync(0);
    }
});

// Event listener for the first off button to turn off both LEDs
off_filling.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        turnOffLEDs();
    }
});

// Event listener for the second off button to turn off both LEDs
off_glass.watch((err, value) => {
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
    solidLED_filling.unexport();
    solidLED_glass.unexport();
    blinkLED_filling.unexport();
    blinkLED_glass.unexport();
    solid_filling.unexport();
    solid_glass.unexport();
    blinking_filling.unexport();
    blinking_glass.unexport();
    off_filling.unexport();
    off_glass.unexport();
});