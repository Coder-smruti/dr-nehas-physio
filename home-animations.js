/* HOME ANIMATIONS - COMPLETE FILE */

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
    const slides = document.querySelectorAll('.service-slide');
    const slideWidth = 350;
    
    if (carousel) {
        carousel.style.animation = 'none';
        carouselPosition += direction * slideWidth;
        const maxScroll = -(slideWidth * (slides.length - 3));
        
        if (carouselPosition > 0) {
            carouselPosition = maxScroll;
        } else if (carouselPosition < maxScroll) {
            carouselPosition = 0;
        }
        
        carousel.style.transform = `translateX(${carouselPosition}px)`;
        
        setTimeout(() => {
            carousel.style.animation = 'autoScroll 40s linear infinite';
        }, 5000);
    }
}

// 3. Animated Counters (Gentle - No excessive rotation)
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (target < 10) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target < 10) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(target);
                }
            }
        };
        
        updateCounter();
    });
}

// 4. Scroll Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.closest('.stats-section')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// 5. Service Click Handler
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            window.location.href = 'services.html';
        });
        slide.style.cursor = 'pointer';
    });
});

// 6. Smooth Scroll
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

// 7. Nav Scroll Effect
window.addEventListener('scroll', function() {
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

// 9. Mobile Menu Close on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 10. Page Load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 11. Mobile Carousel Speed
if (window.innerWidth <= 768) {
    const carousel = document.getElementById('servicesCarousel');
    if (carousel) {
        carousel.style.animation = 'autoScroll 30s linear infinite';
    }
}

console.log('✨ Dr. Neha\'s Clinic - Homepage Loaded!');
