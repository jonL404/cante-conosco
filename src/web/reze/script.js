/* =========================================================
   Ministério São José — Página de Orações — script.js
   ========================================================= */

/* ---------- 1. Dados das orações ---------- */
// Oração do card de destaque (primeiro slide do hero)
const oracaoDestaque = {
  id: "coroa-lagrimas",
  titulo: "Coroa das Lágrimas de Nossa Senhora",
  categoria: "Consagração",
  descricao: "Medite as dores da Virgem Maria e ofereça, por suas lágrimas, os seus pedidos a Jesus.",
  imagem: "/src/web/assets/hero-lagrimas.jpg.jpeg",
  alt: "Imagem de Nossa Senhora com uma lágrima, iluminada por velas",
  data: "15 de setembro de 2026",
  texto: [
    "Ó Jesus crucificado, prostrados a vossos pés, nós vos oferecemos as lágrimas d'Aquela que, com tanto amor e compaixão, vos acompanhou no caminho doloroso do Calvário.",
    "Nas contas grandes: Vede, ó Jesus, que são as lágrimas d'Aquela que mais vos amou na terra e que mais vos ama no Céu.",
    "Nas contas pequenas: Ó Jesus, atendei os nossos rogos, pelas lágrimas de vossa Mãe Santíssima.",
    "Ao final: Virgem Santíssima e Mãe das Dores, nós vos pedimos que junteis os vossos rogos aos nossos, a fim de que Jesus, vosso divino Filho, ouça as nossas súplicas. Amém."
  ]
};

// Os 3 cards da lista (gerados dinamicamente)
const oracoes = [
  {
    id: "ladainha",
    titulo: "Ladainha de Nossa Senhora",
    categoria: "Ladainha",
    descricao: "Invoque os títulos de Maria e peça a sua intercessão materna.",
    imagem: "/src/web/assets/ladainha.jpg.jpeg",
    alt: "Altar barroco com imagem coroada de Nossa Senhora, lírios e velas",
    data: "8 de setembro de 2026",
    texto: [
      "Senhor, tende piedade de nós. Cristo, tende piedade de nós. Senhor, tende piedade de nós.",
      "Santa Maria, rogai por nós. Santa Mãe de Deus, rogai por nós. Santa Virgem das virgens, rogai por nós.",
      "Mãe de Cristo, Mãe da Igreja, Mãe da divina graça, Mãe puríssima, Mãe castíssima — rogai por nós.",
      "Rainha dos Anjos, Rainha dos Patriarcas, Rainha da Paz — rogai por nós.",
      "Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém."
    ]
  },
  {
    id: "coroinha",
    titulo: "Coroinha de Nossa Senhora",
    categoria: "Coroinha",
    descricao: "Uma oração simples e bela para honrar as virtudes da Virgem Maria.",
    imagem: "/src/web/assets/coroinha.jpg.jpeg",
    alt: "Mãos em oração segurando um terço azul diante de uma imagem de Maria",
    data: "12 de outubro de 2026",
    texto: [
      "Bendita seja a santa e imaculada Conceição da Bem-aventurada Virgem Maria, Mãe de Deus.",
      "Rezam-se três Pai-Nossos e doze Ave-Marias, oferecendo cada dezena às grandezas de Maria: sua excelência, seu poder e sua bondade.",
      "Ó Maria, concebida sem pecado, rogai por nós que recorremos a vós. Amém."
    ]
  },
  {
    id: "misericordia",
    titulo: "Terço da Misericórdia",
    categoria: "Misericórdia",
    descricao: "Confie na infinita misericórdia de Jesus e reze pelo mundo inteiro.",
    imagem: "/src/web/assets/misericordia.jpg.jpeg",
    alt: "Crucifixo iluminado por raios vermelhos e brancos vindos de um vitral",
    data: "3 de novembro de 2026",
    texto: [
      "Início: Pai-Nosso, Ave-Maria e Creio.",
      "Nas contas grandes: Eterno Pai, eu vos ofereço o Corpo e Sangue, Alma e Divindade de vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.",
      "Nas contas pequenas: Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",
      "Ao final (3 vezes): Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.",
      "Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! Amém."
    ]
  }
];

// Mapa id -> oração, para abrir o modal rapidamente
const todasOracoes = [oracaoDestaque, ...oracoes].reduce((mapa, o) => {
  mapa[o.id] = o;
  return mapa;
}, {});

// Orações exibidas no carrossel do hero (na ordem dos slides)
const destaquesCarrossel = ["coroa-lagrimas", "misericordia", "ladainha"];

// Respeita a preferência do usuário por menos movimento
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 2. Gerar os cards dinamicamente ---------- */
function renderizarCards() {
  const grid = document.getElementById("prayers-grid");
  if (!grid) return;

  grid.innerHTML = oracoes
    .map(
      (o, i) => `
      <button type="button" class="card" data-prayer="${o.id}"
              style="transition-delay:${i * 120}ms"
              aria-label="Abrir oração: ${o.titulo}">
        <img class="card__img" src="${o.imagem}" alt="${o.alt}" loading="lazy" />
        <div class="card__overlay" aria-hidden="true"></div>
        <div class="card__content">
          <span class="tag">${o.categoria}</span>
          <h3 class="card__title">${o.titulo}</h3>
          <p class="card__desc">${o.descricao}</p>
          <time class="card__date">${o.data}</time>
        </div>
      </button>`
    )
    .join("");
}

/* ---------- 3. Carrossel do hero ---------- */
// Transforma o texto da categoria em uma "hashtag" (ex.: "Consagração" -> "#consagração")
const paraHashtag = (texto) => "#" + texto.toLowerCase().replace(/\s+/g, "");

function renderizarCarrossel() {
  const trilho = document.getElementById("hero-track");
  const dots = document.getElementById("hero-dots");
  if (!trilho || !dots) return;

  const slides = destaquesCarrossel.map((id) => todasOracoes[id]).filter(Boolean);
  const total = slides.length;

  trilho.innerHTML = slides
    .map(
      (o, i) => `
      <article class="hero__slide" role="group" aria-roledescription="slide"
               aria-label="${i + 1} de ${total}: ${o.titulo}">
        <div class="hero__content">
          <h2 class="hero__title">${o.titulo}</h2>
          <span class="hero__sticker">${paraHashtag(o.categoria)}</span>
          <p class="hero__desc">${o.descricao}</p>
          <button type="button" class="btn btn--green-dark" data-prayer="${o.id}">
            Acessar oração
          </button>
        </div>
        <figure class="stamp">
          <img src="${o.imagem}" alt="${o.alt}" ${i === 0 ? "" : 'loading="lazy"'} />
        </figure>
      </article>`
    )
    .join("");

  dots.innerHTML = slides
    .map(
      (o, i) => `
      <button type="button" class="hero__dot" data-slide="${i}"
              aria-label="Mostrar destaque ${i + 1}: ${o.titulo}"></button>`
    )
    .join("");
}

function iniciarCarrossel() {
  const hero = document.getElementById("hero");
  const trilho = document.getElementById("hero-track");
  const dots = document.getElementById("hero-dots");
  if (!hero || !trilho || !dots) return;

  const slides = trilho.querySelectorAll(".hero__slide");
  const botoes = dots.querySelectorAll(".hero__dot");
  const INTERVALO = 7000; // tempo entre slides (ms)
  let atual = 0;
  let timer = null;

  const irPara = (indice) => {
    atual = (indice + slides.length) % slides.length;
    trilho.style.transform = `translateX(-${atual * 100}%)`;

    // Apenas o slide visível pode receber foco / ser lido
    slides.forEach((slide, i) => {
      const ativo = i === atual;
      slide.setAttribute("aria-hidden", String(!ativo));
      slide.inert = !ativo;
    });
    botoes.forEach((botao, i) => botao.setAttribute("aria-current", String(i === atual)));
  };

  const parar = () => { clearInterval(timer); timer = null; };
  const tocar = () => {
    if (reduzirMovimento || slides.length < 2) return;
    parar();
    timer = setInterval(() => irPara(atual + 1), INTERVALO);
  };

  // Clique nos dots
  dots.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-slide]");
    if (!botao) return;
    irPara(Number(botao.dataset.slide));
    tocar();
  });

  // Setas do teclado quando o foco está no carrossel
  hero.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { irPara(atual + 1); tocar(); }
    if (e.key === "ArrowLeft") { irPara(atual - 1); tocar(); }
  });

  // Gesto de arrastar (celular)
  let inicioX = null;
  hero.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const diferenca = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferenca) > 50) irPara(atual + (diferenca < 0 ? 1 : -1));
    inicioX = null;
    tocar();
  });

  // Pausa ao passar o mouse, ao focar ou com a aba oculta
  hero.addEventListener("mouseenter", parar);
  hero.addEventListener("mouseleave", tocar);
  hero.addEventListener("focusin", parar);
  hero.addEventListener("focusout", tocar);
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : tocar()));

  irPara(0);
  tocar();
}

/* ---------- 4. Menu hambúrguer ---------- */
function iniciarMenu() {
  const botao = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const header = document.getElementById("header");
  if (!botao || !nav) return;

  const alternar = (abrir) => {
    nav.classList.toggle("is-open", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  };

  botao.addEventListener("click", () => alternar(!nav.classList.contains("is-open")));

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => alternar(false))
  );

  // Fecha o menu com ESC e devolve o foco ao botão
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      alternar(false);
      botao.focus();
    }
  });

  // Linha sutil no header após rolar a página
  if (header) {
    const atualizarHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", atualizarHeader, { passive: true });
    atualizarHeader();
  }
}

/* ---------- 5. Modal da oração ---------- */
function iniciarModal() {
  const modal = document.getElementById("modal");
  const botaoFechar = document.getElementById("modal-close");
  if (!modal || !botaoFechar) return;
  let ultimoFoco = null; // devolve o foco ao elemento que abriu o modal

  const abrir = (oracao) => {
    ultimoFoco = document.activeElement;

    document.getElementById("modal-img").src = oracao.imagem;
    document.getElementById("modal-img").alt = oracao.alt;
    document.getElementById("modal-tag").textContent = oracao.categoria;
    document.getElementById("modal-title").textContent = oracao.titulo;
    document.getElementById("modal-desc").textContent = oracao.descricao;
    document.getElementById("modal-text").innerHTML = oracao.texto
      .map((p) => `<p>${p}</p>`)
      .join("");

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    botaoFechar.focus();
  };

  const fechar = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      modal.hidden = true;
      if (ultimoFoco) ultimoFoco.focus();
    }, 300);
  };

  // Abre ao clicar em qualquer elemento com data-prayer (cards e botões do hero)
  document.addEventListener("click", (e) => {
    const gatilho = e.target.closest("[data-prayer]");
    if (gatilho && todasOracoes[gatilho.dataset.prayer]) {
      abrir(todasOracoes[gatilho.dataset.prayer]);
    }
  });

  botaoFechar.addEventListener("click", fechar);

  // Fecha ao clicar fora da caixa
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fechar();
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) fechar();
  });

  // Mantém o foco dentro do modal enquanto ele está aberto (Tab / Shift+Tab)
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focaveis = modal.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });
}

/* ---------- 7. Logo do footer com fallback em texto ---------- */
// Se a imagem do logo não existir, esconde-a e mostra o logo em texto
function iniciarLogoFooter() {
  const img = document.querySelector(".footer__logo-img");
  if (!img) return;
  const textoAlternativo = img.nextElementSibling;

  const usarTexto = () => {
    img.hidden = true;
    if (textoAlternativo) textoAlternativo.hidden = false;
  };

  if (img.complete && img.naturalWidth === 0) usarTexto();
  else img.addEventListener("error", usarTexto);
}

/* ---------- 8. Ano atual no footer ---------- */
function atualizarAno() {
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderizarCards();
  renderizarCarrossel();
  iniciarCarrossel();
  iniciarMenu();
  iniciarModal();
  iniciarLogoFooter();
  atualizarAno();
});
