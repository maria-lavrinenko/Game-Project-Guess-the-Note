class Note {
  constructor(name, audio) {
    this.name = name;
    this.audio = audio;
  }

  play() {
    console.log(this.audio.playbackRate);
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
export default Note;
