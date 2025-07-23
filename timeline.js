function animateOnScroll() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const names = document.querySelector(".names");
  const windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset;

  timelineItems.forEach((item) => {
    const itemTop = item.offsetTop + item.offsetParent.offsetTop;
    const itemHeight = item.offsetHeight;
    const itemBottom = itemTop + itemHeight;

    // Check if item is in viewport (with some margin for better effect)
    const isInViewport =
      scrollTop + windowHeight > itemTop + itemHeight * 0.2 &&
      scrollTop < itemBottom - itemHeight * 0.2;

    if (isInViewport) {
      item.classList.add("animate");
    } else {
      // Remove animation when out of view to re-trigger when scrolling back
      item.classList.remove("animate");
    }
  });

  // Animate names section
  if (names) {
    const namesTop = names.offsetTop;
    const namesBottom = namesTop + names.offsetHeight;
    const namesInViewport =
      scrollTop + windowHeight > namesTop + 50 && scrollTop < namesBottom + 200;

    if (namesInViewport) {
      names.classList.add("animate");
    } else {
      names.classList.remove("animate");
    }
  }
}

// Run on scroll with throttling for performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(animateOnScroll);
    ticking = true;
  }
}

window.addEventListener("scroll", () => {
  requestTick();
  ticking = false;
});

// Run once on page load
document.addEventListener("DOMContentLoaded", animateOnScroll);
