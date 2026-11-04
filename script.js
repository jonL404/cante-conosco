document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menuToggle");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    })
  );

  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 20));

  new Swiper(".hero-slider", {
    loop: true,
    grabCursor: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    pagination: {
      el: ".hero-slider .swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});

function janelaDeCantos() {
      window.location.href = "src/web/cante-com-o-ministerio/index.html";
    }