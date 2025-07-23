const storyObserverOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const storyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      // Remove animation class when element goes out of view for re-animation
      entry.target.classList.remove("animate");
    }
  });
}, storyObserverOptions);

// Observe the title and content elements
const storyTitle = document.getElementById("storyTitle");
const storyContent = document.getElementById("storyContent");

storyObserver.observe(storyTitle);
storyObserver.observe(storyContent);

// Additional smooth scroll animation based on scroll position
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const textSection = document.querySelector(".text-section");
  const textSectionTop = textSection.offsetTop;
  const textSectionHeight = textSection.offsetHeight;

  // Calculate if we're in the text section viewport
  if (
    scrolled >= textSectionTop - window.innerHeight &&
    scrolled <= textSectionTop + textSectionHeight
  ) {
    const progress = Math.min(
      1,
      Math.max(
        0,
        (scrolled - textSectionTop + window.innerHeight) /
          (window.innerHeight + textSectionHeight)
      )
    );

    // Apply additional transform based on scroll progress
    const titleElement = document.getElementById("storyTitle");
    const additionalTransform = -50 + progress * 50;

    if (titleElement.classList.contains("animate")) {
      titleElement.style.transform = `translateX(${Math.max(
        0,
        additionalTransform
      )}px)`;
    }
  }
});

// Trigger animation on page load if element is already in view
window.addEventListener("load", () => {
  const titleRect = storyTitle.getBoundingClientRect();
  if (titleRect.top < window.innerHeight && titleRect.bottom > 0) {
    storyTitle.classList.add("animate");
    storyContent.classList.add("animate");
  }
});
