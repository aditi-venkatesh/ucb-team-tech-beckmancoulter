const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const solidLED_dilution = new Gpio(4, 'out');
const solidLED_glass = new Gpio(7, 'out');
const blinkLED_dilution = new Gpio(6, 'out');
const blinkLED_glass = new Gpio(8, 'out');
const solid_dilution = new Gpio(3, 'in');
const solid_glass = new Gpio(10, 'in');
const off_dilution = new Gpio(5, 'in');
const off_glass = new Gpio(11, 'in');

let dilutionState = 'off';
let glassState = 'off';

// Function to handle department actions
function handleDepartmentAction(department, action) {
    switch (action) {
        case 'notifying':
            if (department === 'dilution') {
                solidLED_dilution.writeSync(0);
                blinkLED_dilution.writeSync(1);
            } else if (department === 'glass') {
                solidLED_glass.writeSync(0);
                blinkLED_glass.writeSync(1);
            }
            break;
        case 'acknowledging':
            if (department === 'dilution') {
                solidLED_dilution.writeSync(1);
                blinkLED_dilution.writeSync(0);
            } else if (department === 'glass') {
                solidLED_glass.writeSync(1);
                blinkLED_glass.writeSync(0);
            }
            break;
        case 'off':
            if (department === 'dilution') {
                solidLED_dilution.writeSync(0);
                blinkLED_dilution.writeSync(0);
            } else if (department === 'glass') {
                solidLED_glass.writeSync(0);
                blinkLED_glass.writeSync(0);
            }
            break;
        default:
            break;
    }
}

// Event listener for dilution department buttons
solid_dilution.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        if (dilutionState === 'off') {
            dilutionState = 'notifying';
            handleDepartmentAction('dilution', dilutionState);
        } else if (dilutionState === 'notifying') {
            dilutionState = 'acknowledging';
            handleDepartmentAction('dilution', dilutionState);
        }
    }
});

off_dilution.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        dilutionState = 'off';
        handleDepartmentAction('dilution', dilutionState);
    }
});

// Event listener for glass department buttons
solid_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        if (glassState === 'off') {
            glassState = 'notifying';
            handleDepartmentAction('glass', glassState);
        } else if (glassState === 'notifying') {
            glassState = 'acknowledging';
            handleDepartmentAction('glass', glassState);
        }
    }
});

off_glass.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        glassState = 'off';
        handleDepartmentAction('glass', glassState);
    }
});

// Clean up GPIO resources on program exit
process.on('SIGINT', () => {
    solidLED_dilution.writeSync(0);
    solidLED_glass.writeSync(0);
    blinkLED_dilution.writeSync(0);
    blinkLED_glass.writeSync(0);
    solid_dilution.unexport();
    solid_glass.unexport();
    off_dilution.unexport();
    off_glass.unexport();
});
