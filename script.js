// Navigation menu toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('nav-active');
        
        // Burger animation
        burger.classList.toggle('toggle');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}

// Scroll animations with GSAP and ScrollTrigger
const initScrollAnimations = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in elements with .fade-in class when they come into view
    gsap.utils.toArray('.fade-in').forEach(elem => {
        gsap.fromTo(
            elem, 
            { 
                y: 50, 
                opacity: 0 
            },
            { 
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Number animation in the statistics section
const animateNumbers = () => {
    const numberElements = document.querySelectorAll('.number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerText = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Set up ScrollTrigger for the numbers section
    const numbersSection = document.querySelector('.numbers');
    if (numbersSection) {
        ScrollTrigger.create({
            trigger: numbersSection,
            start: 'top 80%',
            onEnter: () => {
                numberElements.forEach(numberElement => {
                    const finalValue = parseInt(numberElement.getAttribute('data-count'));
                    animateValue(numberElement, 0, finalValue, 2000);
                });
            },
            once: true
        });
    }
}

// Smooth scrolling for anchor links
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }

            // Scroll to the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
const headerScroll = () => {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            // At the top of page
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = `translateY(-100%)`;
        } else {
            // Scrolling up
            header.style.transform = `translateY(0)`;
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Form submission handling
const formSubmit = () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For this example, we'll just show a success message
            
            // Clear the form
            contactForm.reset();
            
            // Show success message (you would create this element)
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            
            // Append the message after the form
            contactForm.appendChild(successMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    initScrollAnimations();
    animateNumbers();
    smoothScroll();
    headerScroll();
    formSubmit();
}); 