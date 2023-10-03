import Note from "./notes.js";
import function from "./functions.js";

const data = [
  { name: "do", audio: new Audio("./../audio/do.mp3") },
  { name: "re", audio: new Audio("./../audio/re.mp3") },
  { name: "mi", audio: new Audio("./../audio/mi.mp3") },
  { name: "fa", audio: new Audio("./../audio/fa.mp3") },
  { name: "sol", audio: new Audio("./../audio/sol.mp3") },
  { name: "la", audio: new Audio("./../audio/la.mp3") },
  { name: "si", audio: new Audio("./../audio/si.mp3") },
];
const notes = data.map((noteData) => new Note(noteData.name, noteData.audio));

let notesToPlay = [];
let clickedBtns = [];
let count = 30;

const startGameBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const menuScreen = document.getElementById("menu-screen");

const singleNote = document.getElementById("single-note");
const triplet = document.getElementById("triplet");

const playScreen = document.getElementById("play-screen");
const counter = document.querySelector("#time span");
counter.textContent = count;
const score = document.querySelector("#score span");

const playShortBtn = document.getElementById("play-short");
playShortBtn.addEventListener("click", playShort);

const playLongBtn = document.getElementById("play-long");
playLongBtn.addEventListener("click", playLong);

const scale = document.getElementById("scale");
scale.addEventListener("click", () => {
  notes.forEach((note) => note.normal());
  playTheScale(notes);
});

startGameBtn.addEventListener("click", startGame);

menuScreen.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  playScreen.classList.remove("hidden");
});

singleNote.addEventListener("click", () => {
  startSingleNote();

  const intervalId = setInterval(() => {
    count--;

    score.textContent = scoring;

    if (count === 0) {
      //GAME OVER MESSAGE TO ADD
      counter.textContent = count;
      canPlay = false;
      clearInterval(intervalId);
    }
  }, 1000);
});

triplet.addEventListener("click", () => {
  startTriplet();
  const intervalId = setInterval(() => {
    count--;
    counter.textContent = count;
    score.textContent = scoring;

    if (count === 0) {
      //GAME OVER MESSAGE TO ADD
      canPlay = false;
      clearInterval(intervalId);
    }
  }, 1000);
});
