class MusicController {
  constructor() {
    this.audio = document.getElementById("backgroundMusic");
    this.toggleButton = document.getElementById("musicToggle");
    this.musicIcon = document.getElementById("musicIcon");
    this.volumeIndicator = document.getElementById("volumeIndicator");

    this.isPlaying = false;
    this.hasInteracted = false;

    this.init();
  }

  init() {
    // Set initial volume
    this.audio.volume = 0.3;

    // Add event listeners
    this.toggleButton.addEventListener("click", () => this.toggleMusic());

    // Auto-play attempt after user interaction
    document.addEventListener("click", () => this.tryAutoPlay(), {
      once: true,
    });
    document.addEventListener("scroll", () => this.tryAutoPlay(), {
      once: true,
    });

    // Audio event listeners
    this.audio.addEventListener("play", () => this.onPlay());
    this.audio.addEventListener("pause", () => this.onPause());
    this.audio.addEventListener("ended", () => this.onEnded());
    this.audio.addEventListener("error", () => this.onError());

    // Show volume indicator on hover
    this.toggleButton.addEventListener("mouseenter", () =>
      this.showVolumeIndicator()
    );
    this.toggleButton.addEventListener("mouseleave", () =>
      this.hideVolumeIndicator()
    );
  }

  tryAutoPlay() {
    if (!this.hasInteracted) {
      this.hasInteracted = true;
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.updateUI();
        })
        .catch((error) => {
          console.log("Auto-play prevented by browser:", error);
          this.isPlaying = false;
          this.updateUI();
        });
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.updateUI();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          this.showError();
        });
    }
  }

  onPlay() {
    this.isPlaying = true;
    this.updateUI();
  }

  onPause() {
    this.isPlaying = false;
    this.updateUI();
  }

  onEnded() {
    this.isPlaying = false;
    this.updateUI();
  }

  onError() {
    console.error("Audio error occurred");
    this.showError();
  }

  updateUI() {
    if (this.isPlaying) {
      this.musicIcon.className = "fas fa-volume-up";
      this.toggleButton.classList.add("playing");
      this.toggleButton.classList.remove("muted");
      this.toggleButton.title = "Mute Music";
    } else {
      this.musicIcon.className = "fas fa-volume-mute";
      this.toggleButton.classList.remove("playing");
      this.toggleButton.classList.add("muted");
      this.toggleButton.title = "Play Music";
    }
  }

  //  showVolumeIndicator() {
  //    this.volumeIndicator.textContent = this.isPlaying
  //      ? "Music Playing"
  //      : "Music Paused";
  //    this.volumeIndicator.classList.add("show");
  //  }

  hideVolumeIndicator() {
    setTimeout(() => {
      this.volumeIndicator.classList.remove("show");
    }, 300);
  }

  showError() {
    this.volumeIndicator.textContent = "Music Unavailable";
    this.volumeIndicator.classList.add("show");
    setTimeout(() => {
      this.volumeIndicator.classList.remove("show");
    }, 3000);
  }
}

// Initialize music controller when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MusicController();
});
