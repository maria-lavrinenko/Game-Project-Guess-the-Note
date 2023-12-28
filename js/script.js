import Note from "./notes.js";
import { playShort, playLong, playTheScale, gameOver } from "./functions.js";

const data = [
  { name: "do", audio: new Audio("./audio/do.mp3") },
  { name: "re", audio: new Audio("./audio/re.mp3") },
  { name: "mi", audio: new Audio("./audio/mi.mp3") },
  { name: "fa", audio: new Audio("./audio/fa.mp3") },
  { name: "sol", audio: new Audio("./audio/sol.mp3") },
  { name: "la", audio: new Audio("./audio/la.mp3") },
  { name: "si", audio: new Audio("./audio/si.mp3") },
];
const notes = data.map((noteData) => new Note(noteData.name, noteData.audio));
const timeout = 30;

let scoring = 0;
let scoringTriplet = 0;
let canPlay = true;
let notesToPlay = [];
let clickedBtns = [];
let state = "";

const noSound = new Audio("./audio/wrong-answer.mp3");
const okSound = new Audio("./audio/right-answer.mp3");

const notesBtn = document.querySelectorAll(".notesBtn");
const singleNote = document.getElementById("single-note");
const triplet = document.getElementById("triplet");

const timer = document.querySelector("#time span");

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

notesBtn.forEach((noteBtn) => {
  noteBtn.addEventListener("click", (event) => {
    if (!canPlay) {
      return;
    }
    event.target.classList.add("clicked");
    clickedBtns.push(event.target);
    console.log(clickedBtns);
  });
});

singleNote.addEventListener("click", () => {
  state = "singleNote";
  let time = timeout;
  timer.textContent = time;
  notesToPlay = [];
  resetClass();
  clickedBtns = [];
  scoring = 0;
  score.textContent = scoring;
  startSingleNote();

  const intervalId = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time === 0) {
      canPlay = false;
      clearInterval(intervalId);
      resetClass();
      clickedBtns.length = 0;
      gameOver();
    }
  }, 1000);
});

function startSingleNote() {
  canPlay = true;
  let time = timeout;
  randomChoice();
  notesToPlay[0].normal();
  notesToPlay[0].play();
  if (clickedBtns.length === 1 && state === "singleNote") {
    checkIfCorrect(clickedBtns);
    score.textContent = scoring;

    setTimeout(() => {
      resetClass();
      notesToPlay = [];
      clickedBtns = [];

      startSingleNote();
    }, 1200);
  }
}

// for (let i = 0; i < notesBtn.length; i++) {
//   notesBtn[i].addEventListener("click", singleButtons);
// }
// }
// function singleButtons(event) {
// if (
//   event.target.classList.contains("clicked") ||
//   !canPlay ||
//   state !== "singleNote"
// )
//   return;

// event.target.classList.add("clicked");

// if (clickedBtns.length < 1) {
//   clickedBtns.push(event.target);

// s

function randomChoice() {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  notesToPlay.push(randomNote);
}

triplet.addEventListener("click", () => {
  state = "tripletNote";
  resetClass();
  let time = 30;
  timer.textContent = time;
  scoringTriplet = 0;
  notesToPlay = [];
  clickedBtns = [];
  startTriplet();

  const intervalId = setInterval(() => {
    time--;
    timer.textContent = time;
    score.textContent = scoringTriplet;

    if (time === 0) {
      resetClass();
      canPlay = false;
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
});

function startTriplet() {
  canPlay = true;
  let time = timeout;
  clickedBtns.length = 0;
  for (let i = 0; i < 3; i++) {
    randomChoice();
  }
  notesToPlay.forEach((note) => note.normal());
  playTheScale(notesToPlay);

  for (let i = 0; i < notesBtn.length; i++) {
    notesBtn[i].addEventListener("click", tripletButtons);
  }
}

function tripletButtons(event) {
  if (!canPlay || state !== "tripletNote") return;
  event.target.classList.add("clicked");

  if (clickedBtns.length < 3) {
    clickedBtns.push(event.target);

    if (clickedBtns.length === 3) {
      canPlay = false;

      checkIfCorrect(clickedBtns);

      score.textContent = scoringTriplet;
      setTimeout(() => {
        notesToPlay = [];
        resetClass();
        clickedBtns.length = 0;
        startTriplet();
      }, 1500);
    }
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

      okSound.playbackRate = 3;
      okSound.play();
    } else {
      console.log("Nooo");

      arr[i].classList.add("wrong-answer");
      noSound.playbackRate = 3;
      noSound.play();
      setTimeout(() => {
        arr[i].classList.remove("wrong-answer");
      }, 1000);
    }
    const expectedAnswer = document.getElementById(notesToPlay[i].name);
    expectedAnswer.classList.add("expected-answer");
    setTimeout(() => {
      expectedAnswer.classList.remove("expected-answer");
    }, 1200);
  }

  if (tripletCount > 1) {
    scoringTriplet += 1;
  }
}

function resetClass() {
  notesBtn.forEach((btn) => {
    btn.classList.remove(
      "clicked",
      "right-answer",
      "wrong-answer",
      "expected-answer"
    );
  });
}
