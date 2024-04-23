const Gpio = require('onoff').Gpio; // Import the onoff library

// GPIO Pins Initialized
// Department A
const buttonA1 = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - A1 triggers both blinking
const buttonA2 = new Gpio(27, 'in', 'rising', { debounceTimeout: 10 }); // A2 acknowledges and turns both lights solid
const buttonA3 = new Gpio(4, 'in', 'rising', { debounceTimeout: 10 });  // A3 turns off both lights
const lightA = new Gpio(22, 'out'); // light Department A

// Department B
const buttonB1 = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - B1 triggers both blinking
const buttonB2 = new Gpio(24, 'in', 'rising', { debounceTimeout: 10 }); // B2 acknowledges and sets both lights solid
const buttonB3 = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 }); // B3 turns off both lights
const lightB = new Gpio(25, 'out'); // light Department B

let blinkInterval;

// Function to toggle lights between on and off
const toggleLights = () => {
    lightA.writeSync(lightA.readSync() ^ 1);
    lightB.writeSync(lightB.readSync() ^ 1);
};

// Function to start blinking lights
const startBlinking = () => {
    if (!blinkInterval) {
        blinkInterval = setInterval(toggleLights, 500); // Toggle every 500ms
    }
};

// Function to stop blinking and set lights solid
const stopBlinking = () => {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    lightA.writeSync(1); // lights are on
    lightB.writeSync(1);
};

// Function to turn off lights
const turnOffLight = () => {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    lightA.writeSync(0); // lights are off
    lightB.writeSync(0);
};

// Watchers for Department A buttons
buttonA1.watch((err, value) => {
    if (err) {
        console.error('Button A1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonA2.watch((err, value) => {
    if (err) {
        console.error('Button A2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonA3.watch((err, value) => {
    if (err) {
        console.error('Button A3 Error:', err);
    } else {
        turnOffLight();
    }
});

// Watchers for Department B buttons
buttonB1.watch((err, value) => {
    if (err) {
        console.error('Button B1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonB2.watch((err, value) => {
    if (err) {
        console.error('Button B2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonB3.watch((err, value) => {
    if (err) {
        console.error('Button B3 Error:', err);
    } else {
        turnOffLight();
    }
});

// Cleanup on exit
process.on('SIGINT', () => {
    buttonA1.unexport();
    buttonA2.unexport();
    buttonA3.unexport();
    lightA.unexport();
    buttonB1.unexport();
    buttonB2.unexport();
    buttonB3.unexport();
    lightB.unexport();
    if (blinkInterval) clearInterval(blinkInterval);
});
