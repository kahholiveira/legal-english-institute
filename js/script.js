/**
 * Legal English Institute - Interactive JavaScript
 * Modern ES6+ implementation with comprehensive functionality
 */

class LegalEnglishApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.loadUserProgress();
        this.startProgressSimulation();
    }

    /**
     * Initialize the application
     */
    init() {
        this.isMobile = this.detectMobile();
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.progressPanel = document.getElementById('progress-panel');
        this.progressToggle = document.getElementById('progress-toggle');
        this.progressContent = document.getElementById('progress-content');
        
        // Course tabs
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Buttons and interactive elements
        this.enrollButtons = document.querySelectorAll('.btn-primary');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Progress simulation data
        this.progressData = {
            overall: 67,
            current: 45,
            certificates: 3,
            totalCertificates: 8
        };
        
        // Loading states
        this.isLoading = false;
        
        console.log('Legal English Institute App initialized');
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Mobile navigation
        this.hamburger?.addEventListener('click', () => this.toggleMobileNav());
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Course tabs
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e));
        });
        
        // Progress panel toggle
        this.progressToggle?.addEventListener('click', () => this.toggleProgressPanel());
        
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
        
        // Scroll effects
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Button interactions
        this.enrollButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleEnrollment(e));
        });
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
        
        // Initialize intersection observer for animations
        this.initIntersectionObserver();
        
        // Add hover effects to cards
        this.initCardHoverEffects();
        
        // Initialize search functionality
        this.initSearchFunctionality();
    }

    /**
     * Mobile Navigation Toggle
     */
    toggleMobileNav() {
        try {
            const isActive = this.navMenu.classList.contains('active');
            
            if (isActive) {
                this.closeMobileNav();
            } else {
                this.openMobileNav();
            }
        } catch (error) {
            console.error('Error toggling mobile nav:', error);
        }
    }

    openMobileNav() {
        this.navMenu.classList.add('active');
        this.hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }

    closeMobileNav() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
    }

    /**
     * Handle clicks outside mobile nav
     */
    handleOutsideClick(e) {
        if (this.isMobile && this.navMenu.classList.contains('active')) {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileNav();
            }
        }
    }

    /**
     * Course Tabs Switching with Fade Effects
     */
    switchTab(e) {
        e.preventDefault();
        const clickedTab = e.target.dataset.tab;
        
        try {
            // Remove active class from all tabs and contents
            this.tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add fade out effect
            this.tabContents.forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            });
            
            // Wait for fade out, then switch content
            setTimeout(() => {
                this.tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Activate clicked tab and corresponding content
                e.target.classList.add('active');
                const targetContent = document.getElementById(clickedTab);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Fade in effect
                    setTimeout(() => {
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 200);
            
        } catch (error) {
            console.error('Error switching tabs:', error);
        }
    }

    /**
     * Smart Progress Panel Toggle
     */
    toggleProgressPanel() {
        try {
            const isCollapsed = this.progressContent.classList.contains('collapsed');
            
            if (isCollapsed) {
                this.progressContent.classList.remove('collapsed');
                this.progressToggle.classList.remove('collapsed');
                this.progressToggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
            } else {
                this.progressContent.classList.add('collapsed');
                this.progressToggle.classList.add('collapsed');
                this.progressToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
            }
            
            // Update progress data when opened
            if (!isCollapsed) {
                this.updateProgressData();
            }
        } catch (error) {
            console.error('Error toggling progress panel:', error);
        }
    }

    /**
     * Smooth Scrolling Navigation
     */
    smoothScroll(e) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile nav if open
                if (this.navMenu.classList.contains('active')) {
                    this.closeMobileNav();
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                this.updateActiveNavLink(targetId);
            }
        }
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink(targetId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Handle scroll effects
     */
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar background and shadow changes
        if (scrollY > 50) {
            this.navbar.style.background = 'rgba(10, 11, 30, 0.95)';
            this.navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.navbar.style.background = 'rgba(10, 11, 30, 0.8)';
            this.navbar.style.boxShadow = 'none';
        }
        
        // Update active section in navigation
        this.updateActiveSection();
        
        // Throttle scroll events
        if (!this.scrollTimeout) {
            this.scrollTimeout = setTimeout(() => {
                this.scrollTimeout = null;
            }, 100);
        }
    }

    /**
     * Update active section based on scroll position
     */
    updateActiveSection() {
        const sections = ['home', 'dashboard', 'courses', 'contact'];
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.updateActiveNavLink(sectionId);
                }
            }
        });
    }

    /**
     * Course Enrollment Simulation
     */
    async handleEnrollment(e) {
        if (this.isLoading) return;
        
        const button = e.target;
        const originalText = button.textContent;
        const courseCard = button.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        
        try {
            this.isLoading = true;
            
            // Add loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            // Simulate enrollment process
            await this.simulateEnrollment(courseName);
            
            // Success state
            button.innerHTML = '<i class="fas fa-check"></i> Enrolled!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Update progress
            this.updateUserProgress(courseName);
            
            // Show success notification
            this.showNotification('Successfully enrolled in ' + courseName, 'success');
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.opacity = '';
                button.style.background = '';
                this.isLoading = false;
            }, 3000);
            
        } catch (error) {
            console.error('Enrollment error:', error);
            
            // Error state
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            this.showNotification('Enrollment failed. Please try again.', 'error');
            
            // Reset button
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.opacity = '';
                button.style.background = '';
                this.isLoading = false;
            }, 3000);
        }
    }

    /**
     * Simulate enrollment process
     */
    simulateEnrollment(courseName) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true, course: courseName });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    /**
     * Progress Tracking with localStorage
     */
    loadUserProgress() {
        try {
            const savedProgress = localStorage.getItem('legalEnglishProgress');
            if (savedProgress) {
                this.progressData = { ...this.progressData, ...JSON.parse(savedProgress) };
            }
            this.updateProgressDisplay();
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    updateUserProgress(courseName) {
        try {
            // Simulate progress increase
            this.progressData.overall = Math.min(100, this.progressData.overall + 5);
            this.progressData.current = Math.min(100, this.progressData.current + 10);
            
            // Save to localStorage
            localStorage.setItem('legalEnglishProgress', JSON.stringify(this.progressData));
            
            // Update display
            this.updateProgressDisplay();
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }

    updateProgressDisplay() {
        const overallBar = document.querySelector('.progress-fill');
        const currentBar = document.querySelectorAll('.progress-fill')[1];
        const overallPercent = document.querySelector('.progress-percent');
        const currentPercent = document.querySelectorAll('.progress-percent')[1];
        const certificateCount = document.querySelector('.progress-count');
        
        if (overallBar) {
            overallBar.style.width = `${this.progressData.overall}%`;
            overallPercent.textContent = `${this.progressData.overall}%`;
        }
        
        if (currentBar) {
            currentBar.style.width = `${this.progressData.current}%`;
            currentPercent.textContent = `${this.progressData.current}%`;
        }
        
        if (certificateCount) {
            certificateCount.textContent = `${this.progressData.certificates} of ${this.progressData.totalCertificates}`;
        }
    }

    /**
     * Start progress simulation
     */
    startProgressSimulation() {
        setInterval(() => {
            // Simulate small progress increments
            if (Math.random() > 0.7) {
                this.progressData.current = Math.min(100, this.progressData.current + 1);
                this.updateProgressDisplay();
            }
        }, 10000); // Update every 10 seconds
    }

    /**
     * Update progress data with animation
     */
    updateProgressData() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const currentWidth = parseInt(bar.style.width) || 0;
            const targetWidth = index === 0 ? this.progressData.overall : this.progressData.current;
            
            this.animateProgressBar(bar, currentWidth, targetWidth);
        });
    }

    animateProgressBar(bar, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = start + (end - start) * this.easeOutCubic(progress);
            bar.style.width = `${currentValue}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Mobile Detection
     */
    detectMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.isMobile = this.detectMobile();
        
        // Close mobile nav on resize to desktop
        if (!this.isMobile && this.navMenu.classList.contains('active')) {
            this.closeMobileNav();
        }
    }

    /**
     * Keyboard Navigation
     */
    handleKeyboardNav(e) {
        // ESC key closes mobile nav
        if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
            this.closeMobileNav();
        }
        
        // Enter key on buttons
        if (e.key === 'Enter' && e.target.classList.contains('btn')) {
            e.target.click();
        }
    }

    /**
     * Intersection Observer for Animations
     */
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe cards and sections
        const elements = document.querySelectorAll('.feature-card, .course-card, .hero-content');
        elements.forEach(el => observer.observe(el));
    }

    /**
     * Card Hover Effects
     */
    initCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-card, .course-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addCardHoverEffect(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeCardHoverEffect(e.target);
            });
        });
    }

    addCardHoverEffect(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    removeCardHoverEffect(card) {
        card.style.transform = '';
    }

    /**
     * Search Functionality for Courses
     */
    initSearchFunctionality() {
        // Create search input if it doesn't exist
        const coursesSection = document.getElementById('courses');
        if (coursesSection && !document.getElementById('course-search')) {
            this.createSearchInput(coursesSection);
        }
    }

    createSearchInput(container) {
        const searchHTML = `
            <div class="search-container" style="margin-bottom: 2rem; text-align: center;">
                <input type="text" id="course-search" placeholder="Search courses..." 
                       style="padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--border-glass); 
                              background: var(--bg-glass); color: var(--text-primary); width: 100%; max-width: 400px;
                              backdrop-filter: blur(10px);">
            </div>
        `;
        
        const courseTabs = container.querySelector('.course-tabs');
        courseTabs.insertAdjacentHTML('afterend', searchHTML);
        
        const searchInput = document.getElementById('course-search');
        searchInput.addEventListener('input', (e) => this.filterCourses(e.target.value));
    }

    filterCourses(searchTerm) {
        const courseCards = document.querySelectorAll('.course-card');
        const normalizedSearch = searchTerm.toLowerCase().trim();
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            const matches = title.includes(normalizedSearch) || description.includes(normalizedSearch);
            
            if (matches || normalizedSearch === '') {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.95)';
            }
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                       type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                       'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease-in-out'
        });
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    /**
     * Form Validation (for future contact forms)
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!formData.email || !this.validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        return errors;
    }
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new LegalEnglishApp();
        
        // Make app globally accessible for debugging
        window.legalEnglishApp = app;
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .course-card {
                transition: all 0.3s ease-in-out;
            }
            
            .notification {
                font-family: var(--font-primary);
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
        
    } catch (error) {
        console.error('Failed to initialize Legal English App:', error);
    }
});

/**
 * Service Worker Registration (for future PWA features)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}