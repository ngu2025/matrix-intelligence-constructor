// MATRIX INTELLIGENCE UTILITIES - ENHANCED
// Robust helper functions for flawless operation

class MatrixUtils {
    constructor() {
        this.init();
    }

    init() {
        this.setCurrentDate();
        this.initLocalStorage();
        this.setupErrorHandling();
        console.log('🔧 Matrix Utilities initialized - ENHANCED');
    }

    // Enhanced Date formatting
    setCurrentDate() {
        const now = new Date();
        this.currentDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update any date elements in the DOM
        const dateElements = document.querySelectorAll('[data-current-date]');
        dateElements.forEach(element => {
            element.textContent = this.currentDate;
        });
    }

    // Robust Local storage management
    initLocalStorage() {
        if (!this.isLocalStorageAvailable()) {
            console.warn('LocalStorage not available - using fallback');
            this.useFallbackStorage();
            return;
        }

        if (!localStorage.getItem('matrixConstructorData')) {
            localStorage.setItem('matrixConstructorData', JSON.stringify({
                initialized: new Date().toISOString(),
                version: '1.0'
            }));
        }
    }

    isLocalStorageAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    useFallbackStorage() {
        this.fallbackStorage = {};
        console.log('Using fallback storage');
    }

    saveToLocalStorage(key, data) {
        try {
            if (!this.isLocalStorageAvailable()) {
                if (this.fallbackStorage) {
                    this.fallbackStorage[key] = data;
                }
                return true;
            }

            const currentData = this.getFromLocalStorage('matrixConstructorData') || {};
            currentData[key] = {
                value: data,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            
            localStorage.setItem('matrixConstructorData', JSON.stringify(currentData));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.showError('Failed to save progress automatically');
            return false;
        }
    }

    getFromLocalStorage(key) {
        try {
            if (!this.isLocalStorageAvailable()) {
                return this.fallbackStorage ? this.fallbackStorage[key] : null;
            }

            const data = JSON.parse(localStorage.getItem('matrixConstructorData') || '{}');
            const item = data[key];
            
            if (item && item.value !== undefined) {
                return item.value;
            }
            
            return data[key]; // Fallback for old format
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    clearLocalStorage() {
        try {
            if (this.isLocalStorageAvailable()) {
                localStorage.removeItem('matrixConstructorData');
            }
            if (this.fallbackStorage) {
                this.fallbackStorage = {};
            }
            this.initLocalStorage();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // Enhanced DOM utilities
    $(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.error('DOM query error:', error);
            return null;
        }
    }

    $$(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.error('DOM queryAll error:', error);
            return [];
        }
    }

    createElement(tag, classes = '', content = '') {
        try {
            const element = document.createElement(tag);
            if (classes) element.className = classes;
            if (content) element.innerHTML = content;
            return element;
        } catch (error) {
            console.error('Element creation error:', error);
            return document.createElement('div');
        }
    }

    // Robust Animation helpers
    animateElement(element, animation, duration = 300) {
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            try {
                element.style.animation = `${animation} ${duration}ms var(--quantum-ease)`;
                setTimeout(() => {
                    if (element) {
                        element.style.animation = '';
                    }
                    resolve();
                }, duration);
            } catch (error) {
                console.error('Animation error:', error);
                resolve();
            }
        });
    }

    fadeIn(element, duration = 300) {
        return this.animateElement(element, 'quantumFadeIn', duration);
    }

    fadeOut(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        return new Promise((resolve) => {
            try {
                element.style.opacity = '1';
                element.style.transition = `opacity ${duration}ms var(--quantum-ease)`;
                element.style.opacity = '0';
                
                setTimeout(() => {
                    if (element) {
                        element.style.transition = '';
                    }
                    resolve();
                }, duration);
            } catch (error) {
                console.error('Fade out error:', error);
                resolve();
            }
        });
    }

    // Enhanced Validation utilities
    validateEmail(email) {
        if (!email || typeof email !== 'string') return false;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    validateBusinessQuestion(question) {
        if (!question || typeof question !== 'string') {
            return { isValid: false, message: 'Please enter your business question' };
        }
        
        const trimmed = question.trim();
        
        if (trimmed.length === 0) {
            return { isValid: false, message: 'Please enter your business question' };
        }
        
        if (trimmed.length < 10) {
            return { isValid: false, message: 'Question must be at least 10 characters long' };
        }

        if (trimmed.length > 500) {
            return { isValid: false, message: 'Question must not exceed 500 characters' };
        }

        return { isValid: true, message: '' };
    }

    // Enhanced Formatting utilities
    formatCurrency(amount, currency = 'USD') {
        try {
            if (typeof amount !== 'number') {
                amount = parseFloat(amount) || 0;
            }
            
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (error) {
            console.error('Currency formatting error:', error);
            return `$${amount}`;
        }
    }

    formatNumber(number) {
        try {
            if (typeof number !== 'number') {
                number = parseFloat(number) || 0;
            }
            
            return new Intl.NumberFormat('en-US').format(number);
        } catch (error) {
            console.error('Number formatting error:', error);
            return number.toString();
        }
    }

    // Enhanced Time utilities
    formatDuration(days) {
        if (typeof days !== 'number') {
            days = parseFloat(days) || 0;
        }
        
        if (days <= 1) return '24 hours';
        if (days <= 7) return `${days} days`;
        if (days <= 14) return `${days} days`;
        return `${Math.ceil(days / 7)} weeks`;
    }

    // Enhanced Data generation utilities
    generateUniqueId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Robust Error handling
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.showError('An unexpected error occurred');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.showError('An unexpected error occurred');
        });
    }

    showError(message, element = null) {
        console.error('Matrix Intelligence Error:', message);
        
        try {
            // Remove existing error toasts
            const existingToasts = document.querySelectorAll('.error-toast');
            existingToasts.forEach(toast => toast.remove());

            // Create new error toast
            const errorToast = document.createElement('div');
            errorToast.className = 'error-toast';
            errorToast.innerHTML = `
                <div class="error-content">
                    <span class="error-icon">⚠️</span>
                    <span class="error-message">${message}</span>
                    <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            
            errorToast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--matrix-error);
                color: white;
                padding: 0;
                border-radius: 12px;
                z-index: 10000;
                animation: quantumFadeIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
            `;
            
            const errorContent = errorToast.querySelector('.error-content');
            errorContent.style.cssText = `
                display: flex;
                align-items: center;
                padding: 1rem 1.5rem;
                gap: 0.75rem;
            `;
            
            const errorClose = errorToast.querySelector('.error-close');
            errorClose.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin: 0;
                margin-left: auto;
            `;

            document.body.appendChild(errorToast);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (errorToast.parentElement) {
                    errorToast.remove();
                }
            }, 5000);
        } catch (error) {
            console.error('Error showing error message:', error);
        }
        
        if (element) {
            this.highlightError(element);
        }
    }

    highlightError(element) {
        if (!element) return;
        
        element.classList.add('quantum-error');
        setTimeout(() => {
            if (element) {
                element.classList.remove('quantum-error');
            }
        }, 1000);
    }

    showSuccess(message) {
        try {
            const successToast = document.createElement('div');
            successToast.className = 'success-toast';
            successToast.innerHTML = `
                <div class="success-content">
                    <span class="success-icon">✅</span>
                    <span class="success-message">${message}</span>
                </div>
            `;
            
            successToast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--matrix-success);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                z-index: 10000;
                animation: quantumFadeIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            `;

            document.body.appendChild(successToast);

            setTimeout(() => {
                if (successToast.parentElement) {
                    successToast.remove();
                }
            }, 3000);
        } catch (error) {
            console.error('Error showing success message:', error);
        }
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`);
        return result;
    }

    // Enhanced Debounce utility
    debounce(func, wait, immediate = false) {
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

    // Enhanced Throttle utility
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

    // Enhanced Random data generators for demos
    generateRandomInsight(question) {
        const insights = [
            `Market shows strong growth potential with CAGR of ${Math.floor(Math.random() * 20) + 15}% through 2025`,
            `Competitive landscape features ${Math.floor(Math.random() * 10) + 5} major players with ${Math.floor(Math.random() * 40) + 30}% market concentration`,
            `Customer acquisition cost averages $${Math.floor(Math.random() * 100) + 50} in this segment with ${Math.floor(Math.random() * 30) + 10}% YoY increase`,
            `Market size estimated at $${Math.floor(Math.random() * 50) + 10}B with ${Math.floor(Math.random() * 30) + 10}% annual growth driven by digital transformation`,
            `Emerging trends indicate shift towards AI-powered solutions with ${Math.floor(Math.random() * 40) + 20}% adoption rate increase`
        ];
        
        return insights[Math.floor(Math.random() * insights.length)];
    }

    // Enhanced Export utilities
    exportToJSON(data, filename = 'matrix-data.json') {
        try {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            this.downloadBlob(dataBlob, filename);
            this.showSuccess('Data exported successfully');
        } catch (error) {
            console.error('Export error:', error);
            this.showError('Failed to export data');
        }
    }

    downloadBlob(blob, filename) {
        try {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Download error:', error);
            this.showError('Failed to download file');
        }
    }

    // Enhanced Device detection
    isMobileDevice() {
        try {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        } catch (error) {
            return false;
        }
    }

    isTouchDevice() {
        try {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        } catch (error) {
            return false;
        }
    }

    // Enhanced Scroll utilities
    smoothScrollTo(element, duration = 500) {
        if (!element) return Promise.resolve();
        
        return new Promise((resolve) => {
            try {
                const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        resolve();
                    }
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            } catch (error) {
                console.error('Scroll error:', error);
                resolve();
            }
        });
    }

    // Network status monitoring
    setupNetworkMonitoring() {
        window.addEventListener('online', () => {
            this.showSuccess('Connection restored');
        });

        window.addEventListener('offline', () => {
            this.showError('Connection lost - working offline');
        });
    }

    // Data sanitization
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Session management
    startSession() {
        this.sessionId = this.generateUniqueId();
        this.sessionStart = new Date().toISOString();
        
        this.saveToLocalStorage('currentSession', {
            id: this.sessionId,
            start: this.sessionStart,
            userAgent: navigator.userAgent
        });
    }

    getSessionInfo() {
        return {
            id: this.sessionId,
            start: this.sessionStart,
            duration: this.sessionStart ? Date.now() - new Date(this.sessionStart).getTime() : 0
        };
    }
}

// Initialize enhanced utilities
const matrixUtils = new MatrixUtils();

// Start session tracking
matrixUtils.startSession();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MatrixUtils, matrixUtils };
}