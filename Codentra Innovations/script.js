// Loading Page Functionality
function initLoadingPage() {
    const loadingPage = document.getElementById('loadingPage');
    
    // Show loading page for 2.5 seconds
    setTimeout(() => {
        loadingPage.classList.add('fade-out');
        
        // Remove loading page from DOM after fade out
        setTimeout(() => {
            loadingPage.remove();
            // Initialize all other functionality after loading
            initMobileMenu();
            initSmoothScrolling();
            initScrollAnimations();
            initFloatingElements();
            initStatsCounter();
            initParallaxEffects();
            initChatbot();
        }, 500);
    }, 2500);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start with loading page
    initLoadingPage();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .value-item, .vision-card, .mission-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.element');
    
    elements.forEach((element, index) => {
        // Add staggered animation delays
        element.style.animationDelay = `${index * 1.5}s`;
        
        // Add mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Add touch interaction for mobile
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (target === 24 ? '/7' : target === 5 ? '+' : '%');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (target === 24 ? '/7' : target === 5 ? '+' : '%');
            }
        }, 16);
    };
    
    // Start counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-number');
                statItems.forEach(stat => {
                    const text = stat.textContent;
                    let target;
                    
                    if (text.includes('100%')) target = 100;
                    else if (text.includes('5+')) target = 5;
                    else if (text.includes('24/7')) target = 24;
                    
                    if (target) {
                        stat.textContent = '0';
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// Parallax Effects
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Service Cards Hover Effect
function initServiceCardsHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact Form Validation (if needed in future)
function initContactValidation() {
    // Placeholder for future contact form validation
    console.log('Contact validation ready');
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy loading for images (if added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Accessibility Improvements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScrollEffect();
    initServiceCardsHover();
    initContactValidation();
    initPerformanceOptimizations();
    initAccessibility();
    initMobileOptimizations();
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Optimize animations for mobile
        document.body.classList.add('mobile-device');
        
        // Reduce animation complexity on mobile
        const floatingElements = document.querySelectorAll('.floating-elements');
        floatingElements.forEach(element => {
            element.style.animationDuration = '8s';
        });
        
        // Add touch-friendly interactions
        const interactiveCards = document.querySelectorAll('.feature-card, .service-card, .value-item, .vision-card, .mission-card');
        interactiveCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Optimize scroll performance
        let ticking = false;
        function updateScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Mobile-specific scroll effects
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateScroll, { passive: true });
        
        // Add mobile-specific CSS
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .mobile-device .element {
                animation-duration: 8s !important;
            }
            
            .mobile-device .feature-card,
            .mobile-device .service-card,
            .mobile-device .value-item,
            .mobile-device .vision-card,
            .mobile-device .mission-card {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }
            
            .mobile-device .nav-menu a {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }
            
            /* Optimize for mobile performance */
            .mobile-device * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}

// Add CSS for keyboard navigation and focus states
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
    
    .focus-visible {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-white);
            box-shadow: var(--shadow-medium);
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            border-top: 1px solid var(--border-color);
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-menu ul {
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav-menu a {
            display: block;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
        }
        

        
        /* Prevent body scroll when menu is open */
        body.menu-open {
            overflow: hidden;
        }
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    /* Enhanced hover effects */
    .service-card:hover .service-icon {
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    .feature-card:hover .feature-icon {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: all 0.3s ease;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-light);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--secondary-color);
    }
`;

document.head.appendChild(style);

// AI Chatbot Functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickOptions = document.querySelectorAll('.quick-option');

    // Chatbot responses
    const responses = {
        mission: {
            title: "Our Mission",
            content: "Transform ideas into intelligent and scalable digital solutions leveraging AI, web technologies, and modern architectures. We drive business growth through user-centric, efficient, and future-ready products while ensuring innovation, excellence, and seamless experiences.",
            icon: "fas fa-bullseye"
        },
        vision: {
            title: "Our Vision",
            content: "To be a leading innovator in AI-driven digital solutions, empowering businesses with cutting-edge technology and seamless user experiences.",
            icon: "fas fa-eye"
        },
        services: {
            title: "Our Services",
            content: "We offer comprehensive digital solutions including Data Analysis, Real-time Application Development, AI-Driven Digital Solutions, Industrial Apps & Digital Products, Web Development, and Automation Tools as a Service.",
            icon: "fas fa-cogs"
        },
        contact: {
            title: "Contact Information",
            content: "📍 Address: Plot No: 601/3015, Mathasahi, Jagatpur, Cuttack\n📞 Phone: 9937148394 / 9778336221\n📧 Email: info@codentra.in\n💬 WhatsApp: Chat with us (9937148394)",
            icon: "fas fa-address-book"
        }
    };

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Handle quick option clicks
    quickOptions.forEach(option => {
        option.addEventListener('click', () => {
            const query = option.getAttribute('data-query');
            handleUserQuery(query);
        });
    });

    // Handle form submission
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addUserMessage(userMessage);
            chatbotInput.value = '';
            processUserMessage(userMessage);
        }
    });

    // Add user message to chat
    function addUserMessage(message) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-user"></i>
                <div class="message-text">
                    <p>${message}</p>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(userMessageDiv);
        scrollToBottom();
    }

    // Add bot message to chat
    function addBotMessage(content, title = null, icon = null) {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        
        let messageContent = content;
        if (title) {
            messageContent = `<strong>${title}</strong><br>${content}`;
        }
        
        botMessageDiv.innerHTML = `
            <div class="message-content">
                <i class="${icon || 'fas fa-robot'}"></i>
                <div class="message-text">
                    <p>${messageContent}</p>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(botMessageDiv);
        scrollToBottom();
    }

    // Process user message and generate response
    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simulate typing delay
        setTimeout(() => {
            if (lowerMessage.includes('mission') || lowerMessage.includes('purpose')) {
                addBotMessage(responses.mission.content, responses.mission.title, responses.mission.icon);
            } else if (lowerMessage.includes('vision') || lowerMessage.includes('goal')) {
                addBotMessage(responses.vision.content, responses.vision.title, responses.vision.icon);
            } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('work')) {
                addBotMessage(responses.services.content, responses.services.title, responses.services.icon);
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address')) {
                addBotMessage(responses.contact.content, responses.contact.title, responses.contact.icon);
            } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                addBotMessage("Hello! 👋 How can I assist you today? You can ask me about our mission, vision, services, or contact information.");
            } else if (lowerMessage.includes('thank')) {
                addBotMessage("You're welcome! 😊 Is there anything else you'd like to know about Codentra Innovations?");
            } else {
                addBotMessage("I understand you're asking about '${message}'. Let me help you with information about Codentra Innovations. You can ask me about our mission, vision, services, or contact details.");
            }
        }, 1000);
    }

    // Handle quick option queries
    function handleUserQuery(query) {
        if (responses[query]) {
            addUserMessage(responses[query].title);
            setTimeout(() => {
                addBotMessage(responses[query].content, responses[query].title, responses[query].icon);
            }, 500);
        }
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Auto-close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbotContainer.contains(e.target) && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });
}

// Export functions for potential external use
window.CodentraWebsite = {
    initMobileMenu,
    initSmoothScrolling,
    initScrollAnimations,
    initFloatingElements,
    initStatsCounter,
    initParallaxEffects,
    initChatbot
};
