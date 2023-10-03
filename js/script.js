import Note from "./notes.js";

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
// const clickedBtnClass = document.querySelectorAll(".clicked");

const startGameBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const menuScreen = document.getElementById("menu-screen");

const warmUpBtn = document.getElementById("warm-up");
const singleNote = document.getElementById("single-note");
const triplet = document.getElementById("triplet");

const playScreen = document.getElementById("play-screen");
const counter = document.querySelector("p span");

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

function startGame() {
  startScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
}

menuScreen.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  playScreen.classList.remove("hidden");
});

let canPlay = true;

warmUpBtn.addEventListener("click", () => {
  startSingleNote();
});

singleNote.addEventListener("click", () => {
  startSingleNote();

  const intervalId = setInterval(() => {
    count--;
    counter.textContent = count;
    if (count === 0) {
      //GAME OVER MESSAGE TO ADD
      clearInterval(intervalId);
    }
  }, 1000);
});

function startSingleNote() {
  canPlay = true;
  const randomNote = notes[Math.floor(Math.random() * notes.length)];

  notesToPlay.push(randomNote);
  console.log(notesToPlay);
  notesToPlay[0].play();

  const notesBtn = document.querySelectorAll(".notesBtn");
  for (let i = 0; i < notesBtn.length; i++) {
    notesBtn[i].addEventListener("click", () => {
      if (notesBtn[i].classList.contains("clicked") || !canPlay) return;
      notesBtn[i].classList.add("clicked");

      if (clickedBtns.length < 1) {
        clickedBtns.push(notesBtn[i]);

        if (clickedBtns.length === 1) {
          canPlay = false;

          checkIfCorrect(clickedBtns);
        }
      }
    });
  }
}

function checkIfCorrect(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (notesToPlay[i].name === arr[i].id) {
      console.log("Yesss");
      arr[i].classList.add("right-answer");

      const okSound = new Audio("./../audio/right-answer.mp3");
      okSound.play();
    } else {
      console.log("Nooo");

      arr[i].classList.add("wrong-answer");
      const expectedAnswer = document.getElementById(notesToPlay[i].name);
      expectedAnswer.classList.add("expected-answer");
      setTimeout(() => {
        expectedAnswer.classList.remove("expected-answer");
      }, 1300);

      const noSound = new Audio("./../audio/wrong-answer.mp3");
      noSound.play();
    }
  }
  setTimeout(() => {
    notesToPlay = [];
    canPlay = true;
    resetClass();
    clickedBtns = [];
    startSingleNote();
  }, 1300);
}

function resetClass() {
  clickedBtns.forEach((btn) => {
    btn.classList.remove(
      "clicked",
      "right-answer",
      "wrong-answer",
      "expected-answer"
    );
  });
}

triplet.addEventListener("click", () => {
  startTriplet();
});

function startTriplet() {
  canPlay = true;
  for (let i = 0; i < 3; i++) {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    notesToPlay.push(randomNote);
    console.log(notesToPlay);
  }
  playTheScale(notesToPlay);
}

function playShort() {
  notesToPlay.forEach((note) => note.short());
  playTheScale(notesToPlay);
}

function playLong() {
  notesToPlay.forEach((note) => note.long());
  playTheScale(notesToPlay);
}

function playTheScale(arr, index = 0) {
  if (index === arr.length) return;
  console.log(arr);
  arr[index].play();
  arr[index].audio.addEventListener("ended", () => {
    playTheScale(arr, index + 1);
  });
}
