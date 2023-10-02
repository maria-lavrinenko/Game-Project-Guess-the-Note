import Notes from "./notes.js";

const notes = [
  { name: "do", audio: new Audio("./../audio/do.mp3") },
  { name: "re", audio: new Audio("./../audio/re.mp3") },
  { name: "mi", audio: new Audio("./../audio/mi.mp3") },
  { name: "fa", audio: new Audio("./../audio/fa.mp3") },
  { name: "sol", audio: new Audio("./../audio/sol.mp3") },
  { name: "la", audio: new Audio("./../audio/la.mp3") },
  { name: "si", audio: new Audio("./../audio/si.mp3") },
];

const randomNumber = Math.floor(Math.random() * notes.length);
const aNote = new Notes(notes[randomNumber].name, notes[randomNumber].audio);

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
scale.addEventListener("click", playTheScale);

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
  aNote.randomNoteChoice(notes);
  aNote.playNotes();
});

singleNote.addEventListener("click", () => {
  aNote.randomNoteChoice(notes);

  selectNote();
  if (aNote.clickedBtns.length === 1) {
    canPlay = false;
    aNote.checkIfCorrect();
  }
});

triplet.addEventListener("click", () => {
  for (let i = 0; i < 3; i++) {
    aNote.randomNoteChoice(notes);
  }
  aNote.playNotes();
  selectNote();
  if (notes.clickedBtns.length === 3) {
    canPlay = false;
    aNote.checkIfCorrect();
  }
});

function selectNote() {
  playScreen.querySelectorAll(".notesBtn").forEach((notesBtn) => {
    notesBtn.addEventListener("click", () => {
      if (notesBtn.classList.contains("clicked") || !canPlay) return;
      notesBtn.classList.toggle("clicked");

      aNote.clickedBtns.push(notesBtn);
    });
  });
}

function playShort() {
  aNote.playedNotes.playbackRate = 0.5;
  aNote.playedNotes.forEach((note) => note.audio.play());
}

function playLong() {
  aNote.playedNotes.playbackRate = 3.5;
  aNote.playedNotes.forEach((note) => note.audio.play());
}

function playTheScale() {
  notes.forEach((note) => {
    note.audio.playbackRate = 2.0;
    note.audio.play();
  });
}
