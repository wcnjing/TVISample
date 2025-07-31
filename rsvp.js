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

try {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  window.db = db; // Make it globally available

  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission
  const rsvpForm = document.getElementById("luxuryRsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Check if Firebase is initialized
      if (!db) {
        alert("Firebase is not initialized. Please check your configuration.");
        return;
      }

      // Show loading state
      const submitBtn = document.querySelector(".luxury-submit-btn");
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
          // Collect form data - only the fields that exist
          const formData = new FormData(this);
          const rsvpData = {
            firstName: formData.get("firstName") || "",
            lastName: formData.get("lastName") || "",
            attendance: formData.get("attendance") || "",
            message: formData.get("message") || "",
            newsletter: formData.get("newsletter") === "on",
            submittedAt: new Date().toISOString(),
            timestamp: firebase.firestore.Timestamp.now(),
          };

          console.log("Attempting to save RSVP Data:", rsvpData);

          // Save to Firestore
          const docRef = await db.collection("rsvps").add(rsvpData);
          console.log("✅ SUCCESS! Document written with ID:", docRef.id);

          // Show success message
          this.style.display = "none";
          const successMessage = document.getElementById(
            "luxurySuccessMessage"
          );
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
            errorMessage =
              "Network error. Please check your internet connection.";
          } else if (error.code === "unauthenticated") {
            errorMessage =
              "Authentication error. Please check your Firebase configuration.";
          }

          alert(errorMessage + "\n\nError details: " + error.message);

          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
