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

  document.querySelectorAll("[data-carousel]").forEach((c) => {
    const track = c.querySelector(".carousel__track");
    const step = () => (track.firstElementChild?.offsetWidth || 300) + 24;
    c.querySelector("[data-prev]").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    c.querySelector("[data-next]").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  });

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

  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  const open = (t, html) => {
    title.textContent = t;
    body.innerHTML = html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.innerHTML = "";
  };
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.hasAttribute("data-close")) close(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());

  document.querySelectorAll("[data-video]").forEach((b) =>
    b.addEventListener("click", () => open(b.dataset.video, '<div class="modal__video">▶<p>O vídeo será exibido aqui.</p></div>'))
  );
  document.querySelectorAll("[data-enroll]").forEach((b) =>
    b.addEventListener("click", () =>
      open("Inscrição: " + b.dataset.enroll,
        '<form class="modal__form"><input required placeholder="Seu nome"/><input type="email" required placeholder="Seu e-mail"/><button class="btn btn--gold" type="submit">Confirmar inscrição</button></form>')
    )
  );
  body.addEventListener("submit", (e) => {
    e.preventDefault();
    body.innerHTML = "<p>Inscrição recebida! Em breve você receberá as instruções por e-mail.</p>";
  });

  document.getElementById("newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    document.getElementById("newsletterMsg").textContent = "Obrigado! Sua inscrição foi confirmada.";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
