const Gpio = require('onoff').Gpio; // Import the onoff library

// GPIO Pins Initialized
// Filling Department
const buttonFilling1 = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - Filling1 triggers both blinking
const buttonFilling2 = new Gpio(27, 'in', 'rising', { debounceTimeout: 10 }); // Filling2 acknowledges and turns both lights solid
const buttonFilling3 = new Gpio(4, 'in', 'rising', { debounceTimeout: 10 });  // Filling3 turns off both lights
const lightFilling = new Gpio(22, 'out'); // light for Filling Department

// Glassware Department
const buttonGlassware1 = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - Glassware1 triggers both blinking
const buttonGlassware2 = new Gpio(24, 'in', 'rising', { debounceTimeout: 10 }); // Glassware2 acknowledges and sets both lights solid
const buttonGlassware3 = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 }); // Glassware3 turns off both lights
const lightGlassware = new Gpio(25, 'out'); // light for Glassware Department

let blinkInterval;

// Function to toggle lights between on and off
const toggleLights = () => {
    lightFilling.writeSync(lightFilling.readSync() ^ 1);
    lightGlassware.writeSync(lightGlassware.readSync() ^ 1);
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
    lightFilling.writeSync(1); // lights are on
    lightGlassware.writeSync(1);
};

// Function to turn off lights
const turnOffLight = () => {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    lightFilling.writeSync(0); // lights are off
    lightGlassware.writeSync(0);
};

// Watchers for Filling Department buttons
buttonFilling1.watch((err, value) => {
    if (err) {
        console.error('Button Filling1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonFilling2.watch((err, value) => {
    if (err) {
        console.error('Button Filling2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonFilling3.watch((err, value) => {
    if (err) {
        console.error('Button Filling3 Error:', err);
    } else {
        turnOffLight();
    }
});

// Watchers for Glassware Department buttons
buttonGlassware1.watch((err, value) => {
    if (err) {
        console.error('Button Glassware1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonGlassware2.watch((err, value) => {
    if (err) {
        console.error('Button Glassware2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonGlassware3.watch((err, value) => {
    if (err) {
        console.error('Button Glassware3 Error:', err);
    } else {
        turnOffLight();
    }
});

// Cleanup on exit
process.on('SIGINT', () => {
    buttonFilling1.unexport();
    buttonFilling2.unexport();
    buttonFilling3.unexport();
    lightFilling.unexport();
    buttonGlassware1.unexport();
    buttonGlassware2.unexport();
    buttonGlassware3.unexport();
    lightGlassware.unexport();
    if (blinkInterval) clearInterval(blinkInterval);
});
