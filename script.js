/* script.js */

// 1. Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 2. Hero Image Slider (Scrolling Images)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change image every 4000 milliseconds (4 seconds)
setInterval(nextSlide, 4000);
