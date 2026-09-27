document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    /* Highlight the navigation item for the section currently on screen. */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    }, {
        threshold: 0.45
    });

    sections.forEach(section => observer.observe(section));

    /* Smooth navigation with the fixed header taken into account. */
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');

            if (!targetId.startsWith('#')) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    /* Lightbox */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Enlarged artwork';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            openLightbox(image.src, image.alt);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
});
