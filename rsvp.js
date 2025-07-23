// Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
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
let db = null;
const statusElement = document.getElementById("firebaseStatus");

try {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  window.db = db; // Make it globally available

  console.log("✅ Firebase initialized successfully");

  // Hide status after 3 seconds
  if (statusElement) {
    setTimeout(() => {
      statusElement.style.display = "none";
    }, 3000);
  }
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  if (statusElement) {
    statusElement.textContent = "Firebase Error";
    statusElement.className = "firebase-status firebase-error";
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Show/hide guest-related fields based on attendance
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  const guestSection = document.getElementById("guestSection");
  const guestNamesSection = document.getElementById("guestNamesSection");
  const dietarySection = document.getElementById("dietarySection");

  if (attendanceRadios.length > 0) {
    attendanceRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "yes") {
          if (guestSection) guestSection.style.display = "block";
          if (guestNamesSection) guestNamesSection.style.display = "block";
          if (dietarySection) dietarySection.style.display = "block";
          const guestCount = document.getElementById("guestCount");
          if (guestCount) guestCount.required = true;
        } else {
          if (guestSection) guestSection.style.display = "none";
          if (guestNamesSection) guestNamesSection.style.display = "none";
          if (dietarySection) dietarySection.style.display = "none";
          const guestCount = document.getElementById("guestCount");
          if (guestCount) guestCount.required = false;
        }
      });
    });
  }

  // Handle form submission
  const rsvpForm = document.getElementById("rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Check if Firebase is initialized
      if (!db) {
        alert("Firebase is not initialized. Please check your configuration.");
        return;
      }

      // Show loading state
      const submitBtn = document.querySelector(".submit-btn");
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
          // Collect form data
          const formData = new FormData(this);
          const rsvpData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            attendance: formData.get("attendance"),
            guestCount: formData.get("guestCount") || null,
            guestNames: formData.get("guestNames") || "",
            dietaryRestrictions: formData.get("dietaryRestrictions") || "",
            message: formData.get("message") || "",
            submittedAt: new Date().toISOString(),
            timestamp: firebase.firestore.Timestamp.now(),
          };

          console.log("Attempting to save RSVP Data:", rsvpData);

          // Save to Firestore
          const docRef = await db.collection("rsvps").add(rsvpData);
          console.log("✅ SUCCESS! Document written with ID:", docRef.id);

          // Show success message
          this.style.display = "none";
          const successMessage = document.getElementById("successMessage");
          if (successMessage) {
            successMessage.style.display = "block";
            // Scroll to success message
            successMessage.scrollIntoView({
              behavior: "smooth",
            });
          }
        } catch (error) {
          console.error("❌ DETAILED ERROR:", error);

          let errorMessage = "Sorry, there was an error submitting your RSVP.";

          if (error.code === "permission-denied") {
            errorMessage =
              "Permission denied. Please check your Firestore security rules.";
          } else if (error.code === "unavailable") {
            errorMessage = "Network error. Please check your internet connection.";
          }

          alert(errorMessage);

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Add floating animation to floral decorations
  const florals = document.querySelectorAll(".floral-decoration");
  if (florals.length > 0) {
    florals.forEach((floral, index) => {
      if (floral) {
        floral.style.animation = `float ${
          3 + index * 0.5
        }s ease-in-out infinite alternate`;
      }
    });

    // CSS animation for floating effect
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-10px) rotate(2deg); }
      }
    `;
    document.head.appendChild(style);
  }
});