const Gpio = require('onoff').Gpio;

// Define GPIO pins for the LEDs and buttons
const solidLED_glass = new Gpio(4, 'out');
const solidLED_filling = new Gpio(7, 'out');
const blinkLED_glass = new Gpio(6, 'out');
const blinkLED_filling = new Gpio(8, 'out');
const solid_glass = new Gpio(3, 'in');
const solid_filling = new Gpio(10, 'in');
const off_glass = new Gpio(5, 'in');
const off_filling = new Gpio(11, 'in');

let glassState = 'off';
let fillingState = 'off';

// Function to handle department actions
function handleDepartmentAction(department, action) {
    switch (action) {
        case 'notifying':
            if (department === 'glass') {
                solidLED_glass.writeSync(0);
                blinkLED_glass.writeSync(1);
            } else if (department === 'filling') {
                solidLED_filling.writeSync(0);
                blinkLED_filling.writeSync(1);
            }
            break;
        case 'acknowledging':
            if (department === 'glass') {
                solidLED_glass.writeSync(1);
                blinkLED_glass.writeSync(0);
            } else if (department === 'filling') {
                solidLED_filling.writeSync(1);
                blinkLED_filling.writeSync(0);
            }
            break;
        case 'off':
            if (department === 'glass') {
                solidLED_glass.writeSync(0);
                blinkLED_glass.writeSync(0);
            } else if (department === 'filling') {
                solidLED_filling.writeSync(0);
                blinkLED_filling.writeSync(0);
            }
            break;
        default:
            break;
    }
}

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

// Event listener for filling department buttons
solid_filling.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        if (fillingState === 'off') {
            fillingState = 'notifying';
            handleDepartmentAction('filling', fillingState);
        } else if (fillingState === 'notifying') {
            fillingState = 'acknowledging';
            handleDepartmentAction('filling', fillingState);
        }
    }
});

off_filling.watch((err, value) => {
    if (err) {
        throw err;
    }
    if (value === 0) {
        fillingState = 'off';
        handleDepartmentAction('filling', fillingState);
    }
});

// Clean up GPIO resources on program exit
process.on('SIGINT', () => {
    solidLED_glass.writeSync(0);
    solidLED_filling.writeSync(0);
    blinkLED_glass.writeSync(0);
    blinkLED_filling.writeSync(0);
    solid_glass.unexport();
    solid_filling.unexport();
    off_glass.unexport();
    off_filling.unexport();
});
