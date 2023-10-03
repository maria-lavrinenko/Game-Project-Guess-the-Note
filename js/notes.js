class Notes {
  constructor(name, audio) {
    this.name = name;
    this.audio = audio;
  }

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
    this.audio.playbackRate = 3;
  }
}
export default Notes;
