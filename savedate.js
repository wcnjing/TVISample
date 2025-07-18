const weddingDate = new Date("2025-08-20T00:00:00").getTime();
let celebrationTriggered = false;

// Scroll Animation
function handleScrollAnimation() {
  const elements = document.querySelectorAll(
    ".calendar-section, .address-section, .countdown-section, .calendar-button-section, .photo-grid"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate");
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", handleScrollAnimation);

// Trigger on page load
window.addEventListener("load", handleScrollAnimation);

function addToGoogleCalendar() {
  const eventTitle = "Alex & Mason's Wedding";
  const eventDate = "20250816T180000";
  const eventEndDate = "20250816T210000";
  const eventLocation = "123 Grand Hotel, Singapore, ST 12345";
  const eventDescription =
    "Join us for the wedding celebration of Alex and Mason!";
  const timeZone = "Asia/Singapore";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${eventDate}/${eventEndDate}&location=${encodeURIComponent(
    eventLocation
  )}&details=${encodeURIComponent(eventDescription)}&ctz=${timeZone}`;

  window.open(googleCalendarUrl, "_blank");
}

function createConfetti() {
  const confettiContainer = document.getElementById("confetti");
  const colors = [
    "#ab7200",
    "#d4940a",
    "#f5f3f0",
    "#8b5a00",
    "#ff6b6b",
    "#4ecdc4",
  ];
  for (let i = 0; i < 50; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.className = "confetti-piece";
    confettiPiece.style.left = Math.random() * 100 + "%";
    confettiPiece.style.animationDelay = Math.random() * 3 + "s";
    confettiPiece.style.animationDuration = Math.random() * 3 + 2 + "s";
    confettiPiece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confettiContainer.appendChild(confettiPiece);
  }
}

function showCelebration() {
  // Show celebration message
  document.getElementById("celebration-message").style.display = "block";
  // Create confetti
  createConfetti();
  // Remove confetti after 10 seconds (but keep the message)
  setTimeout(() => {
    document.getElementById("confetti").innerHTML = "";
  }, 10000);
}

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;
  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  } else {
    // Wedding day has arrived!
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    // Trigger celebration animation only once
    if (!celebrationTriggered) {
      showCelebration();
      celebrationTriggered = true;
    }
  }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
