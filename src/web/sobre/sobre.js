// Animação suave de entrada ao rolar a página
document.addEventListener("DOMContentLoaded", function () {
  var itens = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    itens.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }
  var observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  itens.forEach(function (el) { observer.observe(el); });
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

