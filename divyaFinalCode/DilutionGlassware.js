const Gpio = require('onoff').Gpio; // Import the onoff library

// GPIO Pins Initialized
// Dilution Department
const buttonDilution1 = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - Dilution1 triggers both blinking
const buttonDilution2 = new Gpio(27, 'in', 'rising', { debounceTimeout: 10 }); // Dilution2 acknowledges and turns both lights solid
const buttonDilution3 = new Gpio(4, 'in', 'rising', { debounceTimeout: 10 });  // Dilution3 turns off both lights
const lightDilution = new Gpio(22, 'out'); // light for Dilution Department

// Glassware Department
const buttonGlassware1 = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - Glassware1 triggers both blinking
const buttonGlassware2 = new Gpio(24, 'in', 'rising', { debounceTimeout: 10 }); // Glassware2 acknowledges and sets both lights solid
const buttonGlassware3 = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 }); // Glassware3 turns off both lights
const lightGlassware = new Gpio(25, 'out'); // light for Glassware Department

let blinkInterval;

// Function to toggle lights between on and off
const toggleLights = () => {
    lightDilution.writeSync(lightDilution.readSync() ^ 1);
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
    lightDilution.writeSync(1); // lights are on
    lightGlassware.writeSync(1);
};

// Function to turn off lights
const turnOffLight = () => {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    lightDilution.writeSync(0); // lights are off
    lightGlassware.writeSync(0);
};

// Watchers for Dilution Department buttons
buttonDilution1.watch((err, value) => {
    if (err) {
        console.error('Button Dilution1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonDilution2.watch((err, value) => {
    if (err) {
        console.error('Button Dilution2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonDilution3.watch((err, value) => {
    if (err) {
        console.error('Button Dilution3 Error:', err);
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
    buttonDilution1.unexport();
    buttonDilution2.unexport();
    buttonDilution3.unexport();
    lightDilution.unexport();
    buttonGlassware1.unexport();
    buttonGlassware2.unexport();
    buttonGlassware3.unexport();
    lightGlassware.unexport();
    if (blinkInterval) clearInterval(blinkInterval);
});
