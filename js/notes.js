class Notes {
  constructor(name, audio) {
    this.name = name;
    this.audio = audio;
    // this.playedNotes = [];
    // this.guessedNotes = 0;
    // this.clickedBtns = [];
  }

  // randomNoteChoice(note) {
  //   this.playedNotes.push(note);
  //   return this.playedNotes;
  // }

  play() {
    this.audio.play();
  }

  short() {
    this.audio.playbackRate = 4;
  }

  long() {
    this.audio.playbackRate = 0.5;
  }

  normal() {
    this.audio.playbackRate = 2;
  }
  selectNote() {
    // const notesBtn = document.querySelectorAll(".notesBtn");
    // for (let i = 0; i < notesBtn.length; i++) {
    //   notesBtn[i].addEventListener("click", () => {
    //     if (notesBtn[i].classList.contains("clicked")) return;
    //     notesBtn[i].classList.add("clicked");
    //     this.clickedBtns.push(notesBtn[i]);
    //   });
    // }
  }

  checkIfCorrect() {
    // for (let i = 0; i < this.playedNotes.length; i++) {
    //   if (this.playedNotes[i].name === this.clickedBtns[i].id) {
    //     console.log(this.playedNotes[i].name);
    //     console.log(this.clickedBtns[i].id);
    //     const okSound = new Audio("./../audio/right-answer.mp3");
    //     okSound.play();
    //   } else {
    //     console.log(this.playedNotes[i].name);
    //     console.log(this.clickedBtns[i].id);
    //     const noSound = new Audio("./../audio/wrong-answer.mp3");
    //     noSound.play();
    //   }
    // }
  }
}
export default Notes;
