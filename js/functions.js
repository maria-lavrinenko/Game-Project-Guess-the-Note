let canPlay = true;
let scoring = 0;

function startGame() {
  startScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
}

function startSingleNote() {
  canPlay = true;
  randomChoice();

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
          setTimeout(() => {
            notesToPlay = [];
            canPlay = true;
            resetClass();
            clickedBtns = [];
            startSingleNote();
          }, 1300);
        }
      }
    });
  }
}

function randomChoice() {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];

  notesToPlay.push(randomNote);
  notesToPlay.play();
}

function checkIfCorrect(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (notesToPlay[i].name === arr[i].id) {
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
      }, 1300);

      const noSound = new Audio("./../audio/wrong-answer.mp3");
      noSound.playbackRate = 3;
      noSound.play();
    }
  }
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

function startTriplet() {
  canPlay = true;
  for (let i = 0; i < 3; i++) {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    notesToPlay.push(randomNote);
    randomNote.normal();
  }

  playTheScale(notesToPlay);

  const notesBtn = document.querySelectorAll(".notesBtn");
  for (let i = 0; i < notesBtn.length; i++) {
    notesBtn[i].addEventListener("click", () => {
      if (notesBtn[i].classList.contains("clicked") || !canPlay) return;
      notesBtn[i].classList.add("clicked");
      notesBtn[i].disabled = true;

      if (clickedBtns.length < 3) {
        clickedBtns.push(notesBtn[i]);

        if (clickedBtns.length === 3) {
          canPlay = false;

          checkIfCorrect(clickedBtns);
          setTimeout(() => {
            notesToPlay = [];
            canPlay = true;
            resetClass();
            clickedBtns = [];
            startTriplet();
          }, 1300);
        }
      }
    });
  }
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

export default functions;
