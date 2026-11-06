document.addEventListener("DOMContentLoaded", function () {
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
    }))
  window.addEventListener("scroll", () =>
    header.classList.toggle("is-scrolled", window.scrollY > 20)
  );
});
