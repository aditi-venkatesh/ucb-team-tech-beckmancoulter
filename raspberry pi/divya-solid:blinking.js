
const setupPin = (pin, direction) => { };
const writePin = (pin, value) => { };
const readPin = (pin) => { };
const onPinChange = (pin, callback) => {  };

setupPin(17, 'output'); // LED 1
setupPin(22, 'output'); // LED 2
setupPin(27, 'input');  // Button 1
setupPin(23, 'input');  // Button 2

let blinkInterval;

// Start blinking LED 2
const startBlinking = () => {
  if (blinkInterval) clearInterval(blinkInterval);
  blinkInterval = setInterval(() => {
    const value = readPin(22); // Read current state of LED 2
    writePin(22, value ^ 1); // Toggle LED 2 state
  }, 500);
};

// Stop blinking LED 2
const stopBlinking = () => {
  if (blinkInterval) clearInterval(blinkInterval);
};

// Button 1 event handler
onPinChange(27, () => {
  writePin(17, 1); // Turn LED 1 on
  startBlinking(); // Start blinking LED 2
});

// Button 2 event handler
onPinChange(23, () => {
  writePin(17, 0); // Turn LED 1 off
  writePin(22, 0); // Turn LED 2 off
  stopBlinking();  // Stop blinking LED 2
});

