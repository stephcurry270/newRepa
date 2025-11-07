function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveMenu() {
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.header__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === currentSection) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    const navClose = document.getElementById('navClose');
    const body = document.body;

    function openMenu() {
        headerNav.classList.add('header__nav--open');
        body.classList.add('menu-open');
    }

    function closeMenu() {
        headerNav.classList.remove('header__nav--open');
        body.classList.remove('menu-open');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    const navLinks = document.querySelectorAll('.header__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            closeMenu();
            
            smoothScrollTo(targetId);
        });
    });

    const logo = document.querySelector('.header__logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (headerNav) {
        headerNav.addEventListener('click', function(e) {
            if (e.target === headerNav) {
                closeMenu();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && headerNav.classList.contains('header__nav--open')) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', updateActiveMenu);

    updateActiveMenu();

    initFooterAccordion();
});
class WelcomeSlider {
    constructor() {
        this.slidesContainer = document.querySelector('.welcome-section__main-slides');
        this.slides = document.querySelectorAll('.welcome-section__main-slide');
        this.prevBtn = document.querySelector('.welcome-section__arrow_left');
        this.nextBtn = document.querySelector('.welcome-section__arrow_right');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.updateSlider();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    updateSlider() {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        this.slides[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WelcomeSlider();
});

function initFooterAccordion() {
    const footerToggles = document.querySelectorAll('.footer__toggle');
    
    footerToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            closeAllFooterAccordions();

            if (!isActive) {
                this.classList.add('active');
                if (content) {
                    content.classList.add('active');
                }
            }
        });
    });
    
    function closeAllFooterAccordions() {
        const activeToggles = document.querySelectorAll('.footer__toggle.active');
        const activeContents = document.querySelectorAll('.footer__content.active');
        
        activeToggles.forEach(toggle => {
            toggle.classList.remove('active');
        });
        
        activeContents.forEach(content => {
            content.classList.remove('active');
        });
    }
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.footer__column')) {
            closeAllFooterAccordions();
        }
    });
}
