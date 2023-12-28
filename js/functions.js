const finalAudio = new Audio("./audio/final sound.mp3");
const menuScreen = document.getElementById("menu-screen");
const playScreen = document.getElementById("play-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", startToMenu);

// const playShortBtn = document.getElementById("play-short");
// const playLongBtn = document.getElementById("play-long");
// playLongBtn.addEventListener("click", () => playLong(notesToPlay));
// playShortBtn.addEventListener("click", () => playShort(notesToPlay));

// scale.addEventListener("click", () => {
//   notes.forEach((note) => note.normal());
//   playTheScale(notes);
// });

export function playShort(arr) {
  arr.forEach((note) => note.short());
  playTheScale(arr);
}

export function playLong(arr) {
  arr.forEach((note) => note.long());
  playTheScale(arr);
}

export function playTheScale(arr, index = 0) {
  if (index === arr.length) return;

  arr[index].play();
  arr[index].audio.addEventListener(
    "ended",
    () => {
      playTheScale(arr, index + 1);
    },
    { once: true }
  );
}

export function startToMenu() {
  startScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
}

export function startPlay() {
  menuScreen.classList.add("hidden");
  playScreen.classList.remove("hidden");
}

export function gameOver() {
  const dialog = document.getElementById("dialog");

  dialog.showModal();
  finalAudio.volume = 0.1;
  finalAudio.play();

  dialog.addEventListener("keypress", () => {
    finalAudio.pause();
    dialog.close();
    playScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
  });
}
