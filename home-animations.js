/* Home Page Animations and Interactive Features */

// 1. Auto-Scroll Services Carousel
let carouselPosition = 0;
const carousel = document.getElementById('servicesCarousel');

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.service-slide');
    const slideWidth = 350; // 320px + 30px gap
    
    if (carousel) {
        carousel.style.animation = 'none'; // Stop auto-scroll on manual control
        
        carouselPosition += direction * slideWidth;
        const maxScroll = -(slideWidth * (slides.length - 3));
        
        if (carouselPosition > 0) {
            carouselPosition = maxScroll;
        } else if (carouselPosition < maxScroll) {
            carouselPosition = 0;
        }
        
        carousel.style.transform = `translateX(${carouselPosition}px)`;
        
        // Restart auto-scroll after 5 seconds
        setTimeout(() => {
            carousel.style.animation = 'autoScroll 40s linear infinite';
        }, 5000);
    }
}

// 2. Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// 3. Scroll Animation Observer (AOS-like effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.closest('.stats-section')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// 4. Smooth Scroll for Internal Links
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

// 5. Hide Fixed Book Button on Scroll Down, Show on Scroll Up
let lastScrollY = window.scrollY;
const fixedBtn = document.querySelector('.fixed-book-btn');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (fixedBtn) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            fixedBtn.style.transform = 'translateY(-100px)';
            fixedBtn.style.opacity = '0';
        } else {
            // Scrolling up
            fixedBtn.style.transform = 'translateY(0)';
            fixedBtn.style.opacity = '1';
        }
    }
    
    lastScrollY = currentScrollY;
});

// 6. Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content-new');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// 7. Service Slide Click to Navigate
document.querySelectorAll('.service-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        window.location.href = 'services.html';
    });
});

// 8. Mobile Menu Close on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 9. Add Loading Animation on Page Load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations for elements in viewport
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('aos-animate');
        }
    });
});

// 10. Auto-pause carousel on mobile to save battery
if (window.innerWidth <= 768) {
    const carousel = document.getElementById('servicesCarousel');
    if (carousel) {
        carousel.style.animation = 'autoScroll 30s linear infinite';
    }
}

console.log('✨ Dr. Neha\'s Clinic - Enhanced Homepage Loaded!');
