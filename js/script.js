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
// let randomNumber = Math.floor(Math.random() * notes.length);
// let aNote = new Notes(notes[randomNumber].name, notes[randomNumber].audio);

const startGameBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const menuScreen = document.getElementById("menu-screen");

const warmUpBtn = document.getElementById("warm-up");
const singleNote = document.getElementById("single-note");
const triplet = document.getElementById("triplet");

const playScreen = document.getElementById("play-screen");

const playShortBtn = document.getElementById("play-short");
playShortBtn.addEventListener("click", playShort);

const playLongBtn = document.getElementById("play-long");
playLongBtn.addEventListener("click", playLong);

const scale = document.getElementById("scale");
scale.addEventListener("click", () => playTheScale(notes));

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
  aNote.randomNoteChoice(aNote);
  aNote.playNotes();
});

singleNote.addEventListener("click", () => {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  notesToPlay.push(randomNote);
  console.log(notesToPlay);
  notesToPlay[0].play();
  // aNote.randomNoteChoice(aNote);
  // console.log(aNote.playedNotes);
  // aNote.playNotes();
  // aNote.selectNote();
  // if (aNote.clickedBtns.length === 1) {
  //   // canPlay = false;
  //   aNote.checkIfCorrect();
  // }
});

// if (aNote.checkIfCorrect) {
//   const okSound = new Audio("./../audio/right-answer.mp3");
//   okSound.play();
// } else {
//   const noSound = new Audio("./../audio/wrong-answer.mp3");
//   noSound.play();
// }

triplet.addEventListener("click", () => {
  // for (let i = 0; i < 3; i++) {
  //   let randomNumber = Math.floor(Math.random() * notes.length);
  //   let aNote = new Notes(notes[randomNumber].name, notes[randomNumber].audio);
  //   console.log(aNote.playedNotes);
  //   aNote.randomNoteChoice(aNote);
  // }
  // aNote.playNotes();
  // if (notes.clickedBtns.length === 3) {
  //   canPlay = false;
  //   aNote.checkIfCorrect();
  // }
});

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
  arr[index].play();
  arr[index].audio.addEventListener("ended", () => {
    playTheScale(arr, index + 1);
  });

  // console.log(notes[i].audio);
  // const currentNote = notes[i].audio;

  // currentNote.playbackRate = 0.4;
  // currentNote.play();
  // currentNote.addEventListener("ended", () => {
  //   playTheScale(i + 1);
  // });
  // for (let i = 0; i < notes.length + 1; i++) {
  //   // const currentNote = notes[i];
  //   notes[i].audio.play();
  //   notes[i].audio.addEventListener("ended", () => {
  //     playTheScale(notes[i + 1]);
  //   });
  // }
}
