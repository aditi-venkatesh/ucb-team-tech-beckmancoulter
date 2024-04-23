// Import the 'onoff' library to control GPIO pins
const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const dilutionLED = new Gpio(4, 'out');    // LED for dilution connected to GPIO pin 4, set as output
const glassLED = new Gpio(7, 'out');       // LED for glass connected to GPIO pin 7, set as output
const solidButton_dilution = new Gpio(3, 'in');     // Button for solid state of dilution connected to GPIO pin 3, set as input
const solidButton_glass = new Gpio(10, 'in');        // Button for solid state of glass connected to GPIO pin 10, set as input
const blinkingButton_dilution = new Gpio(5, 'in');   // Button for blinking state of dilution connected to GPIO pin 5, set as input
const blinkingButton_glass = new Gpio(11, 'in');      // Button for blinking state of glass connected to GPIO pin 11, set as input
const offButton_dilution = new Gpio(12, 'in');      // Button for turning off dilution connected to GPIO pin 12, set as input
const offButton_glass = new Gpio(13, 'in');          // Button for turning off glass connected to GPIO pin 13, set as input

// Function to turn off both LEDs
function turnOffLEDs() {
    dilutionLED.writeSync(0);
    glassLED.writeSync(0);
}

// Function to make the LED blink
function blinkLED(led) {
    let isOn = 0;
    return setInterval(() => {
        isOn = isOn ? 0 : 1;
        led.writeSync(isOn);
    }, 500); // 500ms interval for blinking
}

let blinkInterval_dilution = null;
let blinkInterval_glass = null;

// Event listener for the solid button of dilution to toggle solid state for dilution LED
solidButton_dilution.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        clearInterval(blinkInterval_dilution); // Stop blinking if it's ongoing
        dilutionLED.writeSync(1);
    }
});

// Event listener for the solid button of glass to toggle solid state for glass LED
solidButton_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        clearInterval(blinkInterval_glass); // Stop blinking if it's ongoing
        glassLED.writeSync(1);
    }
});

// Event listener for the blinking button of dilution to toggle blinking state for dilution LED
blinkingButton_dilution.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        turnOffLEDs(); // Turn off LEDs before blinking
        clearInterval(blinkInterval_dilution); // Stop any previous blinking
        blinkInterval_dilution = blinkLED(dilutionLED); // Start blinking for dilution LED
        glassLED.writeSync(1); // Turn on glass LED solidly
    }
});

// Event listener for the blinking button of glass to toggle blinking state for glass LED
blinkingButton_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        turnOffLEDs(); // Turn off LEDs before blinking
        clearInterval(blinkInterval_glass); // Stop any previous blinking
        blinkInterval_glass = blinkLED(glassLED); // Start blinking for glass LED
        dilutionLED.writeSync(1); // Turn on dilution LED solidly
    }
});

// Event listener for the off button of dilution to turn off dilution LED
offButton_dilution.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        clearInterval(blinkInterval_dilution); // Stop blinking if ongoing
        dilutionLED.writeSync(0); // Turn off dilution LED
    }
});

// Event listener for the off button of glass to turn off glass LED
offButton_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        clearInterval(blinkInterval_glass); // Stop blinking if ongoing
        glassLED.writeSync(0); // Turn off glass LED
    }
});

// Clean up GPIO resources on program exit
process.on('SIGINT', () => {
    turnOffLEDs();
    dilutionLED.unexport();
    glassLED.unexport();
    solidButton_dilution.unexport();
    solidButton_glass.unexport();
    blinkingButton_dilution.unexport();
    blinkingButton_glass.unexport();
    offButton_dilution.unexport();
    offButton_glass.unexport();
});