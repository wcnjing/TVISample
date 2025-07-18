document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".timeline-2")
    .forEach((el) => observer.observe(el));

  const timelineLine = document.querySelector(".main-timeline-2");
  window.addEventListener("scroll", () => {
    const rect = timelineLine.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      timelineLine.classList.add("active");
    } else {
      timelineLine.classList.remove("active");
    }
  });
});
