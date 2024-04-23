const Gpio = require('onoff').Gpio; // Import the onoff library

// GPIO Pins Initialized
// Water Department
const buttonWater1 = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - triggers both blinking
const buttonWater2 = new Gpio(27, 'in', 'rising', { debounceTimeout: 10 }); // Acknowledges and turns both lights solid
const buttonWater3 = new Gpio(4, 'in', 'rising', { debounceTimeout: 10 });  // Turns off both lights
const lightWater = new Gpio(22, 'out'); // light for Water Department

// Glassware Department
const buttonGlassware1 = new Gpio(23, 'in', 'rising', { debounceTimeout: 10 }); // Notifies - triggers both blinking
const buttonGlassware2 = new Gpio(24, 'in', 'rising', { debounceTimeout: 10 }); // Acknowledges and sets both lights solid
const buttonGlassware3 = new Gpio(18, 'in', 'rising', { debounceTimeout: 10 }); // Turns off both lights
const lightGlassware = new Gpio(25, 'out'); // light for Glassware Department

let blinkInterval;

// Function to toggle lights between on and off
const toggleLights = () => {
    lightWater.writeSync(lightWater.readSync() ^ 1);
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
    lightWater.writeSync(1); // lights are on
    lightGlassware.writeSync(1);
};

// Function to turn off lights
const turnOffLight = () => {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    lightWater.writeSync(0); // lights are off
    lightGlassware.writeSync(0);
};

// Watchers for Water Department buttons
buttonWater1.watch((err, value) => {
    if (err) {
        console.error('Button Water1 Error:', err);
    } else {
        startBlinking();
    }
});

buttonWater2.watch((err, value) => {
    if (err) {
        console.error('Button Water2 Error:', err);
    } else {
        stopBlinking();
    }
});

buttonWater3.watch((err, value) => {
    if (err) {
        console.error('Button Water3 Error:', err);
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
    buttonWater1.unexport();
    buttonWater2.unexport();
    buttonWater3.unexport();
    lightWater.unexport();
    buttonGlassware1.unexport();
    buttonGlassware2.unexport();
    buttonGlassware3.unexport();
    lightGlassware.unexport();
    if (blinkInterval) clearInterval(blinkInterval);
});
