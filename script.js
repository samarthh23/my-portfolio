/**
 * MAIN PORTFOLIO JAVASCRIPT
 * Enhanced with Theme Toggle and Improved Functionality
 */

// ==========================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================

// Theme initialization and management
const themeManager = {
    init: function() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme on load
        this.applyTheme(this.currentTheme, false);
        
        // Setup theme toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            
            // Keyboard accessibility
            this.themeToggle.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
        
        console.log('🎨 Theme system initialized:', this.currentTheme);
    },
    
    toggleTheme: function() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme, true);
    },
    
    applyTheme: function(theme, animate = false) {
        const html = document.documentElement;
        
        if (animate) {
            // Add transition class for smooth theme change
            html.style.transition = 'none';
            setTimeout(() => {
                html.style.transition = '';
            }, 10);
        }
        
        // Apply theme
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update ARIA label
        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
        
        this.currentTheme = theme;
    }
};

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        navMenu.setAttribute('aria-hidden', !isExpanded);
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional - uncomment to enable)
    /*
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    */
    
    lastScrollTop = scrollTop;
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==========================================
// EMAIL VALIDATION
// ==========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Animate message appearance
    if (typeof anime !== 'undefined') {
        anime({
            targets: formMessage,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 400,
            easing: 'easeOutQuad'
        });
    }
    
    // Clear message after 5 seconds
    setTimeout(() => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: formMessage,
                opacity: 0,
                duration: 400,
                easing: 'easeOutQuad',
                complete: () => {
                    formMessage.style.display = 'none';
                }
            });
        } else {
            formMessage.style.display = 'none';
        }
    }, 5000);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 12px;
        color: ${type === 'success' ? '#000' : '#fff'};
        background: ${type === 'success' ? '#fff' : '#000'};
        border: 2px solid ${type === 'success' ? '#000' : '#fff'};
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        max-width: 300px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in with Anime.js if available
    if (typeof anime !== 'undefined') {
        anime({
            targets: notification,
            translateX: [400, 0],
            duration: 500,
            easing: 'easeOutExpo'
        });
        
        // Animate out after delay
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: 400,
                opacity: 0,
                duration: 400,
                easing: 'easeInQuad',
                complete: () => {
                    notification.remove();
                }
            });
        }, 4000);
    } else {
        // Fallback animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// ==========================================
// EMAIL FORM FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Initialize theme system
    themeManager.init();
    
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    
    if (!contactForm || !submitBtn) return;
    
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const formMessage = document.getElementById("formMessage");

    // Initialize EmailJS with your public key
    emailjs.init("2L3g0GULPVN3DFmt3");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form data for validation
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validate form data
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = "none";
        btnLoading.style.display = "inline-block";

        // Clear any previous messages
        if (formMessage) {
            formMessage.style.display = 'none';
        }

        // Prepare template parameters
        const templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Send email using EmailJS
        emailjs.send("service_tmidxqs", "template_6ymm754", templateParams)
            .then(function (response) {
                console.log("SUCCESS!", response.status, response.text);
                contactForm.reset();
                showMessage("Message sent successfully! I'll get back to you soon.", "success");
                showNotification("Message sent successfully! I'll get back to you soon.", "success");
            })
            .catch(function (error) {
                console.error("FAILED...", error);
                showMessage("Failed to send message. Please try again or contact me directly.", "error");
                showNotification("Failed to send message. Please try again later.", "error");
            })
            .finally(function () {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = "inline";
                btnLoading.style.display = "none";
            });
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-color);
    color: var(--primary-bg);
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ==========================================
// CONSOLE BRANDING
// ==========================================

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🚀 Samarth Hegde's Portfolio           ║
║   Built with ❤️ and modern web tech      ║
║                                           ║
║   📧 samarthhegde45@gmail.com            ║
║   🌐 Enhanced with Anime.js              ║
║   🎨 Black & White Theme System          ║
║                                           ║
╚═══════════════════════════════════════════╝
`);

// ==========================================
// INITIALIZATION COMPLETE
// ==========================================

window.addEventListener('load', () => {
    console.log('✨ Portfolio fully loaded and interactive');
    
    // Remove any loading screens
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});