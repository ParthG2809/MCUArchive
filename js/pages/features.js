/* Signature diagrams on the Spider-Verse and Mutant pages: strands draw themselves when scrolled into view. */

(function drawStrands() {
  const strands = [...document.querySelectorAll(".feature .strand")];
  if (!strands.length || prefersReducedMotion || !("IntersectionObserver" in window)) return;

  strands.forEach((path) => {
    path.dataset.dash = path.getAttribute("stroke-dasharray") || "";
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    gsap.to(strands, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      stagger: 0.15,
      // Restore dotted/dashed styles once each line has finished drawing.
      onComplete: () => strands.forEach((path) => {
        path.style.strokeDasharray = path.dataset.dash || "none";
        path.style.strokeDashoffset = 0;
      }),
    });
  }, { threshold: 0.35 }).observe(strands[0].closest(".feature"));
})();
