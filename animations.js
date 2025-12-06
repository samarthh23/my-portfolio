/**
 * ANIME.JS ANIMATIONS
 * Sophisticated animations for portfolio elements
 * Uses easing functions and scroll-triggered animations
 */

// Wait for DOM and Anime.js to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.error('Anime.js is not loaded - content will display without animations');
        // Make sure content is visible even without animations
        document.querySelectorAll('.hero-content, .hero-title .title-line, .hero-subtitle, .hero-description, .hero-buttons, .hero-social').forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    // ==========================================
    // HERO SECTION ANIMATIONS
    // ==========================================
    
    // Animate hero title with staggered letter reveal
    function animateHeroTitle() {
        const titleLines = document.querySelectorAll('.hero-title .title-line');
        
        anime.timeline({
            easing: 'easeOutExpo'
        })
        .add({
            targets: titleLines,
            opacity: [0, 1],
            translateY: [60, 0],
            duration: 1200,
            delay: anime.stagger(300)
        });
    }

    // Animate hero content elements
    function animateHeroContent() {
        anime({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 1000,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-buttons',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 1200,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-social .social-link',
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.5, 1],
            duration: 800,
            delay: anime.stagger(100, {start: 1400}),
            easing: 'easeOutExpo'
        });
    }

    // Animate profile card
    function animateProfileCard() {
        anime({
            targets: '.profile-card',
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [10, 0],
            duration: 1500,
            delay: 500,
            easing: 'easeOutElastic(1, .8)'
        });

        // Floating elements animation
        anime({
            targets: '.float-element',
            translateY: [
                { value: -20, duration: 2000 },
                { value: 0, duration: 2000 }
            ],
            opacity: [0, 0.6, 0.6, 0.6],
            rotate: [
                { value: 360, duration: 4000 }
            ],
            delay: anime.stagger(500, {start: 1500}),
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    // ==========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ==========================================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate section title
                if (target.classList.contains('section-animate')) {
                    animateSectionTitle(target);
                }
                
                // Animate about section
                if (target.id === 'about') {
                    animateAboutSection();
                }
                
                // Animate projects
                if (target.id === 'projects') {
                    animateProjects();
                }
                
                // Animate experience
                if (target.id === 'experience') {
                    animateExperience();
                }
                
                // Animate contact
                if (target.id === 'contact') {
                    animateContact();
                }
                
                // Unobserve after animation
                animateOnScroll.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section-animate').forEach(section => {
        animateOnScroll.observe(section);
    });

    // ==========================================
    // SECTION-SPECIFIC ANIMATIONS
    // ==========================================
    
    // Animate section title
    function animateSectionTitle(section) {
        const title = section.querySelector('.section-title');
        if (title) {
            anime({
                targets: title,
                opacity: [0, 1],
                translateY: [50, 0],
                scale: [0.9, 1],
                duration: 1000,
                easing: 'easeOutExpo'
            });
        }
    }

    // About section animations
    function animateAboutSection() {
        // Animate text paragraphs
        anime({
            targets: '.about-text p',
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 1000,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });

        // Animate skill tags
        anime({
            targets: '.skill-tag',
            opacity: [0, 1],
            scale: [0, 1],
            duration: 600,
            delay: anime.stagger(50, {start: 400}),
            easing: 'easeOutElastic(1, .6)'
        });

        // Animate education items
        anime({
            targets: '.education-item',
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 1000,
            delay: anime.stagger(200, {start: 300}),
            easing: 'easeOutExpo'
        });
    }

    // Projects section animations
    function animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        anime({
            targets: projectCards,
            opacity: [0, 1],
            translateY: [60, 0],
            rotate: [5, 0],
            scale: [0.9, 1],
            duration: 1200,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });

        // Animate tech tags on project cards
        projectCards.forEach((card, index) => {
            const techTags = card.querySelectorAll('.tech-tag');
            anime({
                targets: techTags,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: anime.stagger(50, {start: 800 + (index * 200)}),
                easing: 'easeOutExpo'
            });
        });
    }

    // Experience section animations
    function animateExperience() {
        // Animate timeline items
        anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateX: [-60, 0],
            duration: 1000,
            delay: anime.stagger(300),
            easing: 'easeOutExpo'
        });

        // Animate timeline markers
        anime({
            targets: '.timeline-marker',
            scale: [0, 1],
            duration: 800,
            delay: anime.stagger(300, {start: 200}),
            easing: 'easeOutElastic(1, .8)'
        });

        // Animate certification items
        anime({
            targets: '.cert-item',
            opacity: [0, 1],
            translateX: [60, 0],
            duration: 1000,
            delay: anime.stagger(200, {start: 400}),
            easing: 'easeOutExpo'
        });
    }

    // Contact section animations
    function animateContact() {
        // Animate contact methods
        anime({
            targets: '.contact-method',
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.8, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
        });

        // Animate form
        anime({
            targets: '.contact-form',
            opacity: [0, 1],
            translateX: [60, 0],
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo'
        });

        // Animate form groups
        anime({
            targets: '.form-group',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: anime.stagger(100, {start: 600}),
            easing: 'easeOutExpo'
        });
    }

    // ==========================================
    // INTERACTIVE ANIMATIONS
    // ==========================================
    
    // Button hover animation
    function setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
                // Animate icon inside button
                const icon = btn.querySelector('i');
                if (icon) {
                    anime({
                        targets: icon,
                        translateX: [0, 5],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
                const icon = btn.querySelector('i');
                if (icon) {
                    anime({
                        targets: icon,
                        translateX: 0,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    // Project card hover animations
    function setupProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -10,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
                
                // Animate project icon
                const icon = card.querySelector('.project-icon');
                anime({
                    targets: icon,
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Social link hover animations
    function setupSocialLinkAnimations() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: link,
                    translateY: -8,
                    scale: 1.1,
                    rotate: [0, 10, 0],
                    duration: 400,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                anime({
                    targets: link,
                    translateY: 0,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Navigation link underline animation
    function setupNavLinkAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Create underline element
            const underline = document.createElement('div');
            underline.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 2px;
                background: currentColor;
                transform: translateX(-50%);
                transition: width 0.3s ease;
            `;
            
            // Make link position relative
            link.style.position = 'relative';
            link.appendChild(underline);
            
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: underline,
                    width: '80%',
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    anime({
                        targets: underline,
                        width: 0,
                        duration: 400,
                        easing: 'easeOutExpo'
                    });
                }
            });
            
            // Keep underline for active link
            if (link.classList.contains('active')) {
                underline.style.width = '80%';
            }
        });
    }

    // Skill tag pulse animation on hover
    function setupSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                anime({
                    targets: tag,
                    scale: [1, 1.1, 1.05],
                    duration: 400,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                anime({
                    targets: tag,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Form input focus animations
    function setupFormAnimations() {
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input.parentElement,
                    translateX: [0, 5, 0],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // ==========================================
    // FOOTER ANIMATION
    // ==========================================
    
    function animateFooter() {
        const footer = document.querySelector('.footer');
        
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.footer-content',
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                    
                    anime({
                        targets: '.footer-social .social-link',
                        opacity: [0, 1],
                        scale: [0, 1],
                        duration: 600,
                        delay: anime.stagger(100, {start: 400}),
                        easing: 'easeOutElastic(1, .6)'
                    });
                    
                    footerObserver.unobserve(footer);
                }
            });
        }, {threshold: 0.5});
        
        if (footer) {
            footerObserver.observe(footer);
        }
    }

    // ==========================================
    // PAGE LOAD ANIMATION SEQUENCE
    // ==========================================
    
    function initializeAnimations() {
        // Hero animations
        animateHeroTitle();
        animateHeroContent();
        animateProfileCard();
        
        // Interactive animations
        setupButtonAnimations();
        setupProjectCardAnimations();
        setupSocialLinkAnimations();
        setupNavLinkAnimations();
        setupSkillTagAnimations();
        setupFormAnimations();
        
        // Footer animation
        animateFooter();
        
        console.log('🎨 Anime.js animations initialized');
    }

    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    
    // Animate page load
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        complete: () => {
            // Initialize all animations after fade in
            initializeAnimations();
        }
    });

    // ==========================================
    // CUSTOM CURSOR TRAIL (Optional Enhancement)
    // ==========================================
    
    // Uncomment to enable cursor trail effect
    
    let cursorTrail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({x: e.clientX, y: e.clientY});
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    });
    

});

/**
 * IMPLEMENTATION NOTES:
 * 
 * 1. All animations use easeOutExpo or easeOutElastic for smooth, natural motion
 * 2. Stagger delays create cascading effects for multiple elements
 * 3. Scroll-triggered animations use IntersectionObserver for performance
 * 4. Interactive animations respond to hover/focus events
 * 5. All animations respect prefers-reduced-motion settings (handled in CSS)
 * 
 * PERFORMANCE TIPS:
 * - Animations are triggered once per scroll (unobserved after)
 * - Use transform and opacity for best performance
 * - Avoid animating layout properties (width, height, margin)
 * - Keep animation durations under 1000ms for responsiveness
 */