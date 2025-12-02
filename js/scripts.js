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
                closeMenu();
            });
        });

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

        function initFooterAccordion() {
            const footerToggles = document.querySelectorAll('.footer__toggle');
            
            footerToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const contentId = this.getAttribute('aria-controls');
                    const content = document.getElementById(contentId);
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';

                    document.querySelectorAll('.footer__toggle[aria-expanded="true"]').forEach(openToggle => {
                        if (openToggle !== this) {
                            openToggle.setAttribute('aria-expanded', 'false');
                            const openContent = document.getElementById(openToggle.getAttribute('aria-controls'));
                            if (openContent) {
                                openContent.classList.remove('active');
                            }
                        }
                    });

                    const newExpanded = !isExpanded;
                    this.setAttribute('aria-expanded', newExpanded);
                    
                    if (content) {
                        if (newExpanded) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    }
                });
            });

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.footer__column')) {
                    document.querySelectorAll('.footer__toggle[aria-expanded="true"]').forEach(toggle => {
                        toggle.setAttribute('aria-expanded', 'false');
                        const content = document.getElementById(toggle.getAttribute('aria-controls'));
                        if (content) {
                            content.classList.remove('active');
                        }
                    });
                }
            });
        }
        
        initFooterAccordion();
    });
