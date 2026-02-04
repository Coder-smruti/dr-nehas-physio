/* ===============================
   SCROLL REVEAL (SAFE)
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".wow-card, .wow-fade").forEach(el => {
  observer.observe(el);
});

/* ===============================
   STATS COUNTER (BUG FIXED)
================================ */
const statSection = document.getElementById("statsSection");
let statsPlayed = false;

const statObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsPlayed) {
    statsPlayed = true;
    document.querySelectorAll(".stat-number").forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const step = target / 60;

      const update = () => {
        count += step;
        if (count < target) {
          counter.innerText = target % 1 === 0 ? Math.floor(count) : count.toFixed(1);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  }
}, { threshold: 0.4 });

statObserver.observe(statSection);
