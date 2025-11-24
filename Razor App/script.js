// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-play carousel
let autoPlayInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause on hover
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// Initialize first slide
showSlide(0);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling
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

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature, product, and testimonial cards
document.querySelectorAll('.feature-card, .product-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Button Click Effects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-signup, .pay-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Payment Method Selection
document.querySelectorAll('.method').forEach(method => {
    method.addEventListener('click', function() {
        document.querySelectorAll('.method').forEach(m => m.classList.remove('active'));
        this.classList.add('active');
    });
});

// POS Method Selection
document.querySelectorAll('.pos-method').forEach(method => {
    method.addEventListener('click', function() {
        document.querySelectorAll('.pos-method').forEach(m => m.classList.remove('active'));
        this.classList.add('active');
    });
});

// Currency Selector
document.querySelectorAll('.currency-selector span').forEach(currency => {
    currency.addEventListener('click', function() {
        document.querySelectorAll('.currency-selector span').forEach(c => {
            c.style.borderColor = '#e5e5e5';
            c.style.background = 'transparent';
            c.style.color = 'inherit';
        });
        this.style.borderColor = 'var(--primary-color)';
        this.style.background = 'rgba(51, 149, 255, 0.1)';
        this.style.color = 'var(--primary-color)';
    });
});

// Payment Option Selection
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.option').forEach(o => {
            o.style.borderColor = '#e5e5e5';
            o.style.background = 'transparent';
        });
        this.style.borderColor = 'var(--primary-color)';
        this.style.background = 'rgba(51, 149, 255, 0.1)';
    });
});

// Animate chart bars on slide change
function animateChartBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transition = 'height 0.5s ease-out';
        }, index * 100);
    });
}

// Observe when banking slide is active
const bankingSlide = document.querySelector('[data-slide="2"]');
if (bankingSlide) {
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('active')) {
                animateChartBars();
            }
        });
    }, { threshold: 0.5 });
    
    slideObserver.observe(bankingSlide);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .btn-signup, .pay-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (max-width: 968px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 2rem;
            gap: 1rem;
            z-index: 1000;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    /* Smooth transitions for carousel */
    .carousel-slide {
        transition: opacity 0.8s ease-in-out;
    }
    
    /* Payment interface animations */
    .payment-interface,
    .payroll-interface,
    .banking-interface,
    .pos-interface,
    .international-interface {
        animation: slideInRight 0.8s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateX(50px);
        }
        to {
            opacity: 1;
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1);
    }
}

// Stats Counter Animation (if needed)
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Console welcome message
console.log('%c🚀 Welcome to Razorpay!', 'font-size: 20px; font-weight: bold; color: #3395FF;');
console.log('%cBuilt with ❤️ for India\'s boldest disruptors', 'font-size: 12px; color: #666;');
