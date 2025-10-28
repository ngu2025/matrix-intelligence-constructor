// MATRIX INTELLIGENCE UTILITIES
// Helper functions and common utilities

class MatrixUtils {
    constructor() {
        this.init();
    }

    init() {
        this.setCurrentDate();
        this.initLocalStorage();
    }

    // Date formatting
    setCurrentDate() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Local storage management
    initLocalStorage() {
        if (!localStorage.getItem('matrixConstructorData')) {
            localStorage.setItem('matrixConstructorData', JSON.stringify({}));
        }
    }

    saveToLocalStorage(key, data) {
        try {
            const currentData = this.getFromLocalStorage('matrixConstructorData') || {};
            currentData[key] = data;
            localStorage.setItem('matrixConstructorData', JSON.stringify(currentData));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    getFromLocalStorage(key) {
        try {
            const data = JSON.parse(localStorage.getItem('matrixConstructorData') || '{}');
            return data[key];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    clearLocalStorage() {
        try {
            localStorage.removeItem('matrixConstructorData');
            this.initLocalStorage();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // DOM utilities
    $(selector) {
        return document.querySelector(selector);
    }

    $$(selector) {
        return document.querySelectorAll(selector);
    }

    createElement(tag, classes = '', content = '') {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (content) element.innerHTML = content;
        return element;
    }

    // Animation helpers
    animateElement(element, animation, duration = 300) {
        return new Promise((resolve) => {
            element.style.animation = `${animation} ${duration}ms var(--quantum-ease)`;
            setTimeout(() => {
                element.style.animation = '';
                resolve();
            }, duration);
        });
    }

    fadeIn(element, duration = 300) {
        return this.animateElement(element, 'quantumFadeIn', duration);
    }

    fadeOut(element, duration = 300) {
        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms var(--quantum-ease)`;
        element.style.opacity = '0';
        
        return new Promise((resolve) => {
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }

    // Validation utilities
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateBusinessQuestion(question) {
        if (!question || question.trim().length === 0) {
            return { isValid: false, message: 'Please enter your business question' };
        }
        
        if (question.trim().length < 10) {
            return { isValid: false, message: 'Question must be at least 10 characters long' };
        }

        if (question.trim().length > 500) {
            return { isValid: false, message: 'Question must not exceed 500 characters' };
        }

        return { isValid: true, message: '' };
    }

    // Formatting utilities
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    // Time utilities
    formatDuration(days) {
        if (days <= 1) return '24 hours';
        if (days <= 7) return `${days} days`;
        if (days <= 14) return `${days} days`;
        return `${Math.ceil(days / 7)} weeks`;
    }

    // Data generation utilities
    generateUniqueId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Error handling
    showError(message, element = null) {
        console.error('Matrix Intelligence Error:', message);
        
        if (element) {
            this.highlightError(element);
        }
        
        // Could be extended with toast notifications
        return false;
    }

    highlightError(element) {
        element.classList.add('quantum-error');
        setTimeout(() => {
            element.classList.remove('quantum-error');
        }, 1000);
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`);
        return result;
    }

    // Debounce utility
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Throttle utility
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Random data generators for demos
    generateRandomInsight(question) {
        const insights = [
            `Market shows strong growth potential with CAGR of ${Math.floor(Math.random() * 20) + 15}%`,
            `Competitive landscape features ${Math.floor(Math.random() * 10) + 5} major players`,
            `Customer acquisition cost averages $${Math.floor(Math.random() * 100) + 50} in this segment`,
            `Market size estimated at $${Math.floor(Math.random() * 50) + 10}B with ${Math.floor(Math.random() * 30) + 10}% annual growth`,
            `Emerging trends indicate shift towards digital transformation and AI integration`
        ];
        
        return insights[Math.floor(Math.random() * insights.length)];
    }

    // Export utilities
    exportToJSON(data, filename = 'matrix-data.json') {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        this.downloadBlob(dataBlob, filename);
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Mobile detection
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Scroll utilities
    smoothScrollTo(element, duration = 500) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// Initialize utilities
const matrixUtils = new MatrixUtils();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MatrixUtils, matrixUtils };
}