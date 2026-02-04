/* Home Page Animations and Interactive Features - IMPROVED */

// 1. Auto-Scroll Services Carousel
let carouselPosition = 0;
const carousel = document.getElementById('servicesCarousel');

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.service-slide');
    const slideWidth = 295; // 270px + 25px gap
    
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

// 2. Continuous Animated Counter for Stats (Keeps Moving)
let counterAnimations = {};

function animateCountersContinuously() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        // Stop any existing animation for this counter
        if (counterAnimations[index]) {
            cancelAnimationFrame(counterAnimations[index].id);
        }
        
        let current = 0;
        const duration = 2000; // 2 seconds for initial animation
        const pauseDuration = 3000; // 3 seconds pause
        const increment = target / (duration / 16); // 60 FPS
        
        const animateUp = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                counterAnimations[index] = {
                    id: requestAnimationFrame(animateUp)
                };
            } else {
                counter.textContent = target;
                // After reaching target, pause and then restart
                setTimeout(() => {
                    current = 0;
                    counterAnimations[index] = {
                        id: requestAnimationFrame(animateUp)
                    };
                }, pauseDuration);
            }
        };
        
        animateUp();
    });
}

// 3. Scroll Animation Observer (AOS-like effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Trigger continuous counter animation when stats section is visible
            if (entry.target.closest('.stats-section')) {
                animateCountersContinuously();
                // Don't unobserve - we want it to keep triggering
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

// 5. Fixed Book Button - ALWAYS VISIBLE (No hiding on scroll)
// Removed scroll hide functionality as per requirement
// Button stays visible with shine effect from CSS

// 6. Google Maps Integration for "Get Directions" link
document.addEventListener('DOMContentLoaded', function() {
    const getDirectionsLink = document.querySelector('a[href*="google.com"]');
    
    if (getDirectionsLink) {
        getDirectionsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mapsUrl = 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggDEEUYOzIGCAAQRRg8MgYIARBFGEEyBggCEEUYOzIGCAMQRRg7MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyODIwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfWw1QLtqRk6Med1gOOOf_ha&daddr=First+Floor,+Kalinga+Vihar,+Plot+No+-+K4/891,+near+Shiva+Temple,+Kalinga+Vihar+LIG,+Kalinganagar,+Bhubaneswar,+Odisha+751028';
            window.open(mapsUrl, '_blank');
        });
    }
    
    // Also update any other "Get Directions" links
    document.querySelectorAll('.info-link').forEach(link => {
        if (link.textContent.includes('Directions')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const mapsUrl = 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggDEEUYOzIGCAAQRRg8MgYIARBFGEEyBggCEEUYOzIGCAMQRRg7MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyODIwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfWw1QLtqRk6Med1gOOOf_ha&daddr=First+Floor,+Kalinga+Vihar,+Plot+No+-+K4/891,+near+Shiva+Temple,+Kalinga+Vihar+LIG,+Kalinganagar,+Bhubaneswar,+Odisha+751028';
                window.open(mapsUrl, '_blank');
            });
        }
    });
});

// 7. Parallax Effect for Hero Section (Subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content-new');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// 8. Service Slide Click to Navigate
document.querySelectorAll('.service-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        window.location.href = 'services.html';
    });
});

// 9. Mobile Menu Close on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 10. Add Loading Animation on Page Load
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

// 11. Auto-pause carousel on mobile to save battery
if (window.innerWidth <= 768) {
    const carousel = document.getElementById('servicesCarousel');
    if (carousel) {
        carousel.style.animation = 'autoScroll 30s linear infinite';
    }
}

// 12. Enhanced View All Services Button - Smooth Scroll to Services Section
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.btn-view-all');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            // If we're already on services page, don't prevent default
            if (this.getAttribute('href') === 'services.html') {
                return;
            }
            
            // Otherwise scroll to services section if it exists
            const servicesSection = document.querySelector('.services-carousel-section');
            if (servicesSection) {
                e.preventDefault();
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // After scrolling, redirect to services page after 1 second
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 1000);
            }
        });
    }
});

// 13. Add Intersection Observer for continuous counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start continuous animation when stats section is visible
            animateCountersContinuously();
        } else {
            // Stop all counter animations when section is not visible
            Object.values(counterAnimations).forEach(animation => {
                if (animation && animation.id) {
                    cancelAnimationFrame(animation.id);
                }
            });
            counterAnimations = {};
        }
    });
}, {
    threshold: 0.2
});

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 14. Enhanced Navigation - Smooth Scroll to Top
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 15. Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('.service-image');
    images.forEach(img => {
        const bgImage = img.style.backgroundImage;
        if (bgImage) {
            const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            const image = new Image();
            image.src = url;
        }
    });
}

// Call preload on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

console.log('✨ Dr. Neha\'s Clinic - Enhanced & Refined Homepage Loaded!');
console.log('📊 Continuous counter animations active');
console.log('🗺️ Google Maps integration ready');
console.log('💎 Fixed appointment button always visible');
