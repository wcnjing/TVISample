const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all elements that should animate
document.addEventListener("DOMContentLoaded", () => {
  const elementsToObserve = [
    ".schedule-title",
    ".decorative-flourish",
    ".decorative-flourish-right",
    ".couple-signature",
    ...document.querySelectorAll(".event-item"),
  ];

  elementsToObserve.forEach((selector) => {
    const elements =
      typeof selector === "string"
        ? document.querySelectorAll(selector)
        : [selector];
    elements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
  });
});
