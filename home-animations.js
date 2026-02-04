/* FINAL HOME ANIMATIONS - WORKING COUNTERS */

// 1. Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

// 2. Services Carousel
let carouselPosition = 0;
const carousel = document.getElementById('servicesCarousel');

function moveCarousel(direction) {
    if (!carousel) return;
    const slideWidth = 345;
    carousel.style.animation = 'none';
    carouselPosition += direction * slideWidth;
    const slides = document.querySelectorAll('.service-slide');
    const maxScroll = -(slideWidth * (slides.length - 3));
    
    if (carouselPosition > 0) carouselPosition = maxScroll;
    else if (carouselPosition < maxScroll) carouselPosition = 0;
    
    carousel.style.transform = `translateX(${carouselPosition}px)`;
    setTimeout(() => {
        carousel.style.animation = 'autoScroll 40s linear infinite';
    }, 5000);
}

// 3. FIXED COUNTER ANIMATION
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const update = () => {
        current += step;
        if (current < target) {
            if (target < 10) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.ceil(current);
            }
            requestAnimationFrame(update);
        } else {
            if (target < 10) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = Math.ceil(target);
            }
        }
    };
    update();
}

// 4. Observe Stats Section
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, {
    threshold: 0.3
});

const statsSection = document.getElementById('statsSection');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 5. Service Click Handler
document.querySelectorAll('.service-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        window.location.href = 'services.html';
    });
});

// 6. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 7. Nav Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 8. Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 9. Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 10. WOW Animation on Scroll
const wowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.wow-card, .wow-fade').forEach(el => {
    wowObserver.observe(el);
});

// 11. Page Load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('✨ Dr. Neha\'s Clinic - WOW Homepage Loaded!');
console.log('✅ Counter animations ready');
console.log('✅ All sections optimized');
