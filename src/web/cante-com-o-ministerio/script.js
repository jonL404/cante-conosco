
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeModal = document.getElementById('closeModal');
const cards = document.querySelectorAll('.card-cantico');
const header = document.querySelector('.header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open');
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
    });
});

window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const text = card.querySelector('.cantico-text').innerHTML;
        
        modalTitle.innerText = title;
        modalText.innerHTML = text; 
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
});

const fecharJanela = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; 
};

closeModal.addEventListener('click', fecharJanela);
modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) fecharJanela(); 
});

document.getElementById('downloadPdfBtn').addEventListener('click', () => {
    window.print();
});