/* script.js - Enhanced */

// 1. Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 2. Hero Image Slider (Scrolling Images)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length === 0) return; // Safety check
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change image every 4000 milliseconds (4 seconds)
if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

// 3. Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 4. Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav-container');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// 5. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 6. Form validation enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '#e0e0e0';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    });
});

// 7. Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 8. Gallery lightbox (simple version)
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', function() {
        // Simple image viewer - you can enhance this with a proper lightbox library
        window.open(this.src, '_blank');
    });
});

console.log('Dr. Neha\'s Physiotherapy Clinic - Website Enhanced ✨');
