const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
let startInterval;
function onStartButtonClick(e) {
    startInterval = setInterval(getBodyColor, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    
}
function getBodyColor() {
    document.body.style.backgroundColor=getRandomHexColor();
}
 
function onStopButtonClick(e) {
    clearInterval(startInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}