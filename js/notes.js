class Notes {
  constructor(name, audio) {
    this.name = name;
    this.audio = audio;
    this.playedNotes = [];
    this.guessedNotes = 0;
    this.clickedBtns = [];
  }

  randomNoteChoice(note) {
    this.playedNotes.push(note);
  }

  playNotes() {
    this.playedNotes.forEach((note) => {
      console.log(note);
      note.audio.playbackRate = 1.5;
      note.audio.play();
    });
  }

  checkIfCorrect() {
    for (let i = 0; i < this.playedNotes.length; i++) {
      if (this.playedNotes[i].name === this.clickedBtns[i].id) {
        const okSound = new Audio("./../audio/right-answer.mp3");
        okSound.play();
      }
    }
  }
}

export default Notes;
