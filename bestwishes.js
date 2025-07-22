const firebaseConfig = {
  apiKey: "AIzaSyD46R-12SbaDufubSjQD0cXye2HwxBQYJU",
  authDomain: "invitation-sample-a00d5.firebaseapp.com",
  projectId: "invitation-sample-a00d5",
  storageBucket: "invitation-sample-a00d5.firebasestorage.app",
  messagingSenderId: "286231843918",
  appId: "1:286231843918:web:7337649879790a18581f1f",
  measurementId: "G-M19S91RX10",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Carousel variables
let currentPosition = 0;
let isInteracting = false;
let startX = 0;
let currentX = 0;
let autoScrollInterval;
let cardWidth = 320;
let totalCards = 0;
let maxPosition = 0;

// Function to create a wish card
function createWishCard(firstName, lastName, message, index) {
  const fullName = `${firstName} ${lastName}`.trim();

  return `
          <div class="wish-card" style="animation-delay: ${index * 2}s;">
            <div class="corner-hearts">♡</div>
            <div class="corner-hearts-bottom">♡</div>
            <div class="card-content">
              <div class="sender-name">${fullName}</div>
              <div class="wish-message">"${message}"</div>
            </div>
          </div>
        `;
}

// Function to load RSVP data from Firestore
async function loadWeddingWishes() {
  try {
    const loadingMessage = document.getElementById("loadingMessage");
    const carouselContainer = document.getElementById("carouselContainer");
    const track = document.getElementById("carousel-track");

    // Query Firestore for RSVPs with non-empty messages
    const rsvpsRef = db.collection("rsvps");
    const snapshot = await rsvpsRef.get();

    const wishesWithMessages = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Check if message exists and is not empty
      if (data.message && data.message.trim() !== "") {
        wishesWithMessages.push({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          message: data.message.trim(),
          submittedAt: data.submittedAt || data.timestamp,
        });
      }
    });

    // Sort by submission time if available
    wishesWithMessages.sort((a, b) => {
      if (a.submittedAt && b.submittedAt) {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      }
      return 0;
    });

    if (wishesWithMessages.length === 0) {
      track.innerHTML = `
              <div class="no-messages">
                No wedding wishes available yet. Check back soon!
              </div>
            `;
      loadingMessage.style.display = "none";
      carouselContainer.classList.add("loaded");
      return;
    }

    // Create cards from the wishes
    let cardsHTML = "";
    wishesWithMessages.forEach((wish, index) => {
      cardsHTML += createWishCard(
        wish.firstName,
        wish.lastName,
        wish.message,
        index
      );
    });

    // Duplicate cards for seamless loop if we have enough cards
    if (wishesWithMessages.length >= 3) {
      wishesWithMessages.forEach((wish, index) => {
        cardsHTML += createWishCard(
          wish.firstName,
          wish.lastName,
          wish.message,
          index
        );
      });
    }

    // Insert cards into the carousel
    track.innerHTML = cardsHTML;

    // Update carousel variables
    totalCards = wishesWithMessages.length;
    maxPosition = -(cardWidth * totalCards);

    // Adjust track width
    track.style.width = `calc(320px * ${
      wishesWithMessages.length >= 3
        ? wishesWithMessages.length * 2
        : wishesWithMessages.length
    })`;

    // Hide loading and show carousel
    loadingMessage.style.display = "none";
    carouselContainer.classList.add("loaded");

    // Start auto-scroll if we have multiple cards
    if (wishesWithMessages.length > 1) {
      startAutoScroll();
      setupCarouselControls();
    }
  } catch (error) {
    console.error("Error loading wedding wishes:", error);
    document.getElementById("loadingMessage").innerHTML = `
            <div class="error-message">
              <strong>Error loading wedding wishes:</strong><br>
              ${error.message}<br><br>
              <small>Please check your Firebase configuration and network connection.</small>
            </div>
          `;
  }
}

// Auto-scroll function
function autoScroll() {
  if (!isInteracting && totalCards > 1) {
    currentPosition -= 0.8;

    if (currentPosition <= maxPosition) {
      currentPosition = 0;
    }

    document.getElementById(
      "carousel-track"
    ).style.transform = `translateX(${currentPosition}px)`;
  }
}

// Start auto-scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, 50);
}

// Stop auto-scroll
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Setup carousel controls
function setupCarouselControls() {
  const track = document.getElementById("carousel-track");

  // Mouse/Touch handlers
  function handleStart(clientX) {
    isInteracting = true;
    startX = clientX;
    currentX = clientX;
    stopAutoScroll();
    track.style.cursor = "grabbing";
  }

  function handleMove(clientX) {
    if (!isInteracting) return;

    const deltaX = clientX - startX;
    const newPosition = currentPosition + deltaX;

    if (newPosition > 100) {
      track.style.transform = `translateX(100px)`;
    } else if (newPosition < maxPosition - 100) {
      track.style.transform = `translateX(${maxPosition - 100}px)`;
    } else {
      track.style.transform = `translateX(${newPosition}px)`;
    }

    currentX = clientX;
  }

  function handleEnd() {
    if (!isInteracting) return;

    isInteracting = false;
    track.style.cursor = "grab";

    const deltaX = currentX - startX;
    currentPosition += deltaX;

    if (currentPosition > 0) {
      currentPosition = 0;
    } else if (currentPosition < maxPosition) {
      currentPosition = maxPosition;
    }

    track.style.transform = `translateX(${currentPosition}px)`;
    setTimeout(startAutoScroll, 2000);
  }

  // Mouse events
  track.addEventListener("mousedown", (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  });

  document.addEventListener("mousemove", (e) => {
    if (isInteracting) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  });

  document.addEventListener("mouseup", handleEnd);

  // Touch events
  track.addEventListener(
    "touchstart",
    (e) => {
      handleStart(e.touches[0].clientX);
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (isInteracting) {
        handleMove(e.touches[0].clientX);
      }
    },
    { passive: true }
  );

  track.addEventListener("touchend", handleEnd, { passive: true });

  // Prevent text selection
  track.addEventListener("dragstart", (e) => e.preventDefault());
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadWeddingWishes();
});
