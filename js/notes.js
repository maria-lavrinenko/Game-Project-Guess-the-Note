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
      note.audio.playbackRate = 0.5;
      note.audio.play();
    });
  }

  checkIfCorrect() {
    for (let i = 0; i < this.playedNotes.length; i++) {
      return this.playedNotes[i].name === this.clickedBtns[i].id;
    }
  }
}

export default Notes;
