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
        link.addEventListener('click', function() {
            // УБРАН e.preventDefault() - теперь ссылки работают
            closeMenu();
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

    initFooterAccordion();
});

function initFooterAccordion() {
    const footerToggles = document.querySelectorAll('.footer__toggle');
    
    footerToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target'); // Исправлено с id на data-target
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
