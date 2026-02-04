/* Ultra-Modern Home Animations - Enhanced */

// Service name mappings for navigation
const serviceMap = {
    'Musculoskeletal Physio': 'musculoskeletal-physiotherapy',
    'Neurorehabilitation': 'neurorehabilitation',
    'Sports Rehabilitation': 'sports-rehabilitation',
    'Paediatric Physio': 'paediatric-physiotherapy',
    'Pre & Post Surgical Rehab': 'surgical-rehabilitation',
    'Women\'s Health': 'womens-health',
    'Pilates': 'pilates',
    'Cupping Therapy': 'cupping-therapy',
    'Dry Needling': 'dry-needling',
    'Kinesio Taping': 'kinesio-taping',
    'Chiropractic Care': 'chiropractic-care',
    'IASTM': 'iastm'
};

// 1. Auto-Scroll Services Carousel
let carouselPosition = 0;
const carousel = document.getElementById('servicesCarousel');

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.service-slide');
    const slideWidth = 295;
    
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

// 2. Service Click Handler - Navigate to Specific Service
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-slide').forEach(slide => {
        slide.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent.trim();
            const serviceSlug = serviceMap[serviceName];
            
            if (serviceSlug) {
                // Navigate to services page with hash
                window.location.href = `services.html#${serviceSlug}`;
            } else {
                // Fallback to services page
                window.location.href = 'services.html';
            }
        });
        
        // Add pointer cursor
        slide.style.cursor = 'pointer';
    });
});

// 3. Continuous Animated Counter for Stats
let counterAnimations = {};

function animateCountersContinuously() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        if (counterAnimations[index]) {
            cancelAnimationFrame(counterAnimations[index].id);
        }
        
        let current = 0;
        const duration = 2000;
        const pauseDuration = 3000;
        const increment = target / (duration / 16);
        
        const animateUp = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                counterAnimations[index] = {
                    id: requestAnimationFrame(animateUp)
                };
            } else {
                counter.textContent = target;
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

// 4. Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            if (entry.target.closest('.stats-section')) {
                animateCountersContinuously();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// 5. Stats Section Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCountersContinuously();
        } else {
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

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 6. Smooth Scroll for Internal Links
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

// 7. Google Maps Integration
document.addEventListener('DOMContentLoaded', function() {
    const mapsUrl = 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggDEEUYOzIGCAAQRRg8MgYIARBFGEEyBggCEEUYOzIGCAMQRRg7MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyODIwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfWw1QLtqRk6Med1gOOOf_ha&daddr=First+Floor,+Kalinga+Vihar,+Plot+No+-+K4/891,+near+Shiva+Temple,+Kalinga+Vihar+LIG,+Kalinganagar,+Bhubaneswar,+Odisha+751028';
    
    document.querySelectorAll('.info-link').forEach(link => {
        if (link.textContent.includes('Directions') || link.textContent.includes('directions')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(mapsUrl, '_blank');
            });
        }
    });
});

// 8. Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content-new');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// 9. Mobile Menu Handler
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 10. Enhanced Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 11. View All Services Button Handler
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.btn-view-all');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            const servicesSection = document.querySelector('.services-carousel-section');
            if (servicesSection && this.getAttribute('href') !== 'services.html') {
                e.preventDefault();
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 1000);
            }
        });
    }
});

// 12. Add Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('aos-animate');
        }
    });
});

// 13. Mobile Carousel Speed
if (window.innerWidth <= 768) {
    const carousel = document.getElementById('servicesCarousel');
    if (carousel) {
        carousel.style.animation = 'autoScroll 30s linear infinite';
    }
}

// 14. Preload Images
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// 15. Hamburger Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 16. 3D Card Tilt Effect (Optional Enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const cards3D = document.querySelectorAll('.info-card-new, .stat-card-new, .why-card');
    
    cards3D.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
});

// 17. Pie Chart Animation
document.addEventListener('DOMContentLoaded', function() {
    const pieChart = document.querySelector('.pie-chart');
    
    if (pieChart) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pieChart.style.animation = 'rotate-chart 20s linear infinite';
                } else {
                    pieChart.style.animation = 'none';
                }
            });
        }, { threshold: 0.5 });
        
        chartObserver.observe(pieChart);
    }
});

console.log('✨ Dr. Neha\'s Clinic - Ultra-Modern Design Loaded!');
console.log('🎯 Service-specific navigation enabled');
console.log('📊 Continuous counter animations active');
console.log('🗺️ Google Maps integration ready');
console.log('🎨 3D card effects active');
console.log('📈 Pie chart animations ready');
