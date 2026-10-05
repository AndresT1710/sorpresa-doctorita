const opening = document.getElementById("opening");
const main = document.getElementById("main");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const video = document.getElementById("loveVideo");
const placeholder = document.getElementById("videoPlaceholder");

startBtn.addEventListener("click", async () => {
  opening.style.transition = "opacity .8s ease";
  opening.style.opacity = "0";
  setTimeout(() => {
    opening.style.display = "none";
    main.classList.remove("hidden");
    window.scrollTo(0,0);
  }, 800);

  try {
    await music.play();
    musicBtn.textContent = "♫";
  } catch(e) {
    musicBtn.textContent = "▶";
  }
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicBtn.textContent = "♫"; } catch(e) {}
  } else {
    music.pause();
    musicBtn.textContent = "▶";
  }
});

video.addEventListener("loadeddata", () => {
  placeholder.style.display = "none";
});

// Reveal sections gently while scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:"translateY(24px)"},{opacity:1, transform:"translateY(0)"}],
        {duration:900, easing:"ease-out", fill:"forwards"}
      );
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".section").forEach(el => observer.observe(el));
