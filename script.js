let timer;
let isRunning = false;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay() {
  display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function startStopwatch() {
  if (!isRunning) {
    timer = setInterval(() => {
      milliseconds++;
      if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
  } else {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapCounter = 1;
  updateDisplay();
  lapTimes.innerHTML = '';  // Clear lap times
  startStopBtn.textContent = 'Start';
}

function recordLap() {
  if (isRunning) {
    const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimes.appendChild(lapItem);
    lapCounter++;
  }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
