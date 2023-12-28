import Note from "./notes.js";
import {
  startPlay,
  gameOver,
  playLong,
  playShort,
  playTheScale,
} from "./functions.js";

const data = [
  { name: "do", audio: new Audio("./audio/do.mp3 ") },
  { name: "re", audio: new Audio("./audio/re.mp3") },
  { name: "mi", audio: new Audio("./audio/mi.mp3") },
  { name: "fa", audio: new Audio("./audio/fa.mp3") },
  { name: "sol", audio: new Audio("./audio/sol.mp3") },
  { name: "la", audio: new Audio("./audio/la.mp3") },
  { name: "si", audio: new Audio("./audio/si.mp3") },
];
const notes = data.map((noteData) => new Note(noteData.name, noteData.audio));
const playShortBtn = document.getElementById("play-short");
const playLongBtn = document.getElementById("play-long");
playLongBtn.addEventListener("click", () => playLong(notesToGuess));
playShortBtn.addEventListener("click", () => playShort(notesToGuess));

scale.addEventListener("click", () => {
  notes.forEach((note) => note.normal());
  playTheScale(notes);
});

let timer = 30;
let isPlaying = false;
let userAnswer = [];
let notesToGuess = [];
let mode = "";

function startGame() {
  isPlaying = true;

  const timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById("time").textContent = `Time left: ${timer} sec`;
    } else {
      clearInterval(timerInterval);
      isPlaying = false;
      document.getElementById("time").textContent = "Time is over!";
      // document.getElementById("dialog").showModal();
      gameOver();
    }
  }, 1000);

  playNotes();
}

function playNotes() {
  if (mode === "single") {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    notesToGuess.push(randomNote);
    randomNote.audio.play();
    console.log(notesToGuess);
  } else if (mode === "triplet") {
    for (let i = 0; i < 3; i++) {
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      notesToGuess.push(randomNote);
      setTimeout(() => randomNote.audio.play(), i * 1000); // Play notes in succession
    }
  }

  enableButtons();
}

function enableButtons() {
  const buttons = document.querySelectorAll(".notesBtn");
  buttons.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", (event) => {
      if (!isPlaying) return;
      userAnswer.push(event.target);
      // console.log(userAnswer);
      // console.log(notesToGuess[0]);
      if (userAnswer[0].id === notesToGuess[0].name) {
        button.classList.add("right-answer");

        notesToGuess.shift();
      } else {
        button.classList.add("wrong-answer");
        setTimeout(() => {
          button.classList.remove("wrong-answer");
        }, 1000);
      }

      if (notesToGuess.length === 0) {
        setTimeout(() => {
          resetButtons();
          playNotes();
        }, 1000);
      }
    });
  });
}

function resetButtons() {
  const buttons = document.querySelectorAll(".notesBtn");
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("right-answer", "incorrect");
  });
}

function resetGame() {
  notesToGuess = [];
  resetButtons();
  // isPlaying = false;
  timer = 30;
  // document.getElementById("start").disabled = false;
  // document.getElementById("time").textContent = "Time left: 30 sec";
  // document.getElementById("result").textContent = "";
  // document.getElementById("dialog").close();
}

// document.getElementById("start-button").addEventListener("click", startGame);

document.getElementById("single-note").addEventListener("click", () => {
  startPlay();
  mode = "single";
  notesToGuess = [];
  resetButtons();
  startGame();
});

document.getElementById("triplet").addEventListener("click", () => {
  startPlay();
  mode = "triplet";
  notesToGuess = [];
  resetButtons();
  startGame();
});
