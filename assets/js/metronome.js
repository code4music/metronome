const bpmInput = document.getElementById("bpmInput");
const timeSignature = document.getElementById("timeSignature");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const visualizer = document.querySelector(".visualizer");

let intervalId = null;

const tickStrong = new Audio("assets/audio/tick-strong.mp3");
const tickWeak = new Audio("assets/audio/tick-weak.mp3");

startButton.addEventListener("click", () => {
  const bpm = parseInt(bpmInput.value);
  const beatsPerMeasure = parseInt(timeSignature.value);

  if (isNaN(bpm) || bpm <= 0) {
    alert("Por favor, insira um BPM válido (maior que 0).");
    return;
  }

  const interval = (60 / bpm) * 1000;
  let currentBeat = 0;
  visualizer.style.animation = `metronome ${interval / 1000}s infinite`;

  intervalId = setInterval(() => {
    if (currentBeat === 0) {
      tickStrong.currentTime = 0;
      tickStrong.play();
      visualizer.style.backgroundColor = "#ff0000";
    } else {
      tickWeak.currentTime = 0;
      tickWeak.play();
      visualizer.style.backgroundColor = "#0d6efd";
    }

    currentBeat = (currentBeat + 1) % beatsPerMeasure;
  }, interval);

  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  visualizer.style.animation = "none";
  visualizer.style.backgroundColor = "#0d6efd";
  startButton.disabled = false;
  stopButton.disabled = true;
});
