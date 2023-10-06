import Note from "./notes.js";

import { playScreen, startGame, menuScreen, finalAudio } from "./script.js";

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
