import Note from "./notes.js";
import { playShort, playLong, playTheScale, gameOver } from "./functions.js";

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

let time = 10;
let scoring = 0;

let scoringTriplet = 0;
let canPlay = true;
let notesToPlay = [];
let clickedBtns = [];

const startBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
export const menuScreen = document.getElementById("menu-screen");

const singleNote = document.getElementById("single-note");
const triplet = document.getElementById("triplet");

export const playScreen = document.getElementById("play-screen");

const timer = document.querySelector("#time span");
timer.textContent = time;

const score = document.querySelector("#score span");

const scale = document.getElementById("scale");

const playShortBtn = document.getElementById("play-short");
const playLongBtn = document.getElementById("play-long");
playLongBtn.addEventListener("click", () => playLong(notesToPlay));
playShortBtn.addEventListener("click", () => playShort(notesToPlay));

scale.addEventListener("click", () => {
  notes.forEach((note) => note.normal());
  playTheScale(notes);
});

startBtn.addEventListener("click", startToMenu);

function startToMenu() {
  startScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
  startGame();
}

export function startGame() {
  time = 10;

  timer.textContent = time;
  menuScreen.addEventListener("click", () => {
    menuScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");
  });
}

singleNote.addEventListener("click", () => {
  startSingleNote();

  const intervalId = setInterval(() => {
    time--;
    timer.textContent = time;
    score.textContent = scoring;

    if (time === 0) {
      canPlay = false;
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
});

function startSingleNote() {
  console.log("startSingleNote -notes to play", notesToPlay);
  canPlay = true;

  randomChoice();
  notesToPlay[0].normal();
  notesToPlay[0].play();

  const notesBtn = document.querySelectorAll(".notesBtn");
  for (let i = 0; i < notesBtn.length; i++) {
    notesBtn[i].addEventListener("click", () => {
      if (notesBtn[i].classList.contains("clicked") && !canPlay) return;
      notesBtn[i].classList.add("clicked");

      if (clickedBtns.length < 1) {
        clickedBtns.push(notesBtn[i]);

        if (clickedBtns.length === 1) {
          canPlay = false;

          checkIfCorrect(clickedBtns);
          score.textContent = scoring;

          setTimeout(() => {
            resetClass();
            notesToPlay = [];
            clickedBtns = [];
            startSingleNote();
          }, 1000);
        }
      }
    });
  }
}

function randomChoice() {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  notesToPlay.push(randomNote);
  console.log("random choice func - notes to play", notesToPlay);
}

triplet.addEventListener("click", () => {
  scoringTriplet = 0;
  startTriplet();

  const intervalId = setInterval(() => {
    time--;
    timer.textContent = time;
    score.textContent = scoringTriplet;

    if (time === 0) {
      gameOver();
      scoringTriplet = 0;
      canPlay = false;
      clearInterval(intervalId);
    }
  }, 1000);
});

function startTriplet() {
  canPlay = true;
  for (let i = 0; i < 3; i++) {
    randomChoice();
  }

  playTheScale(notesToPlay);

  const notesBtn = document.querySelectorAll(".notesBtn");
  for (let i = 0; i < notesBtn.length; i++) {
    notesBtn[i].addEventListener("click", () => {
      if (!canPlay) return;
      notesBtn[i].classList.add("clicked");

      if (clickedBtns.length < 3) {
        clickedBtns.push(notesBtn[i]);

        if (clickedBtns.length === 3) {
          canPlay = false;

          checkIfCorrect(clickedBtns);

          score.textContent = scoringTriplet;
          setTimeout(() => {
            // resetClass();

            // clickedBtns = [];
            notesToPlay = [];
            startTriplet();
          }, 1200);
        }
      }
    });
  }
}

function checkIfCorrect(arr) {
  canPlay = false;
  let tripletCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (notesToPlay[i].name === arr[i].id) {
      tripletCount++;
      scoring++;

      console.log("Yesss");
      arr[i].classList.add("right-answer");

      const okSound = new Audio("./../audio/right-answer.mp3");
      okSound.playbackRate = 3;
      okSound.play();
    } else {
      console.log("Nooo");

      arr[i].classList.add("wrong-answer");
      const expectedAnswer = document.getElementById(notesToPlay[i].name);
      expectedAnswer.classList.add("expected-answer");
      setTimeout(() => {
        expectedAnswer.classList.remove("expected-answer");
      }, 1000);

      const noSound = new Audio("./../audio/wrong-answer.mp3");
      noSound.playbackRate = 3;
      noSound.play();
    }
  }
  if (tripletCount > 1) {
    scoringTriplet += 1;
  }
  resetClass();
  clickedBtns = [];
}

function resetClass() {
  clickedBtns.forEach((btn) => {
    btn.classList.remove(
      "clicked",
      "right-answer",
      "wrong-answer",
      "expected-answer"
    );
    btn.disabled = false;
  });
}
