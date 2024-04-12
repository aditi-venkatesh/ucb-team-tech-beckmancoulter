// Import the 'onoff' library to control GPIO pins
const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const LED = new Gpio(4, 'out');   // LED connected to GPIO pin 4, set as output
const LED2 = new Gpio(6, 'out');  // Second LED connected to GPIO pin 6, set as output
const button = new Gpio(3, 'in'); // First button connected to GPIO pin 3, set as input
const button2 = new Gpio(5, 'in');// Second button connected to GPIO pin 5, set as input

// Track the state of the LEDs and buttons
let solidState = false;
let blinkingInterval;

// Function to handle toggling between solid and blinking states for the LEDs
function toggleLEDState() {
    solidState = !solidState;
    if (solidState) {
        LED.writeSync(1);
        LED2.writeSync(1);
        clearInterval(blinkingInterval);
    } else {
        blinkingInterval = setInterval(() => {
            LED.writeSync(LED.readSync() ^ 1);
            LED2.writeSync(LED2.readSync() ^ 1);
        }, 250);
    }
}

// Function to handle turning off both LEDs
function turnOffLEDs() {
    LED.writeSync(0);
    LED2.writeSync(0);
    clearInterval(blinkingInterval);
}

// Event listener for the first button
button.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        toggleLEDState();
    }
});

// Event listener for the second button
button2.watch((err, value) => {
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
    LED.unexport();
    LED2.unexport();
    button.unexport();
    button2.unexport();
});