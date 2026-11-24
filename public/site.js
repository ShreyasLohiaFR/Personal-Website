// Progressive enhancement: the whole page remains readable without JavaScript.
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });

  for (const section of sections) {
    // Only prepare off-screen content, so the initial view never flashes blank.
    if (section.getBoundingClientRect().top > window.innerHeight) {
      section.classList.add("ready");
      observer.observe(section);
    }
  }

  reduceMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    for (const section of sections) section.classList.remove("ready");
  });
}
const printButton = document.querySelector("#print");
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener("click", () => window.print());
}
