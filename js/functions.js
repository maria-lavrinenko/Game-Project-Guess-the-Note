import Note from "./notes.js";
import { playScreen, menuScreen } from "./script.js";

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
  // console.log(arr);
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
  const dialog = document.createElement("dialog");
  playScreen.append(dialog);

  dialog.src = "./../styles/press-any-key.jpeg";
  dialog.showModal();

  dialog.addEventListener("keypress", () => {
    playScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
  });
}
