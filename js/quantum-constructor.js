// MATRIX INTELLIGENCE QUANTUM CONSTRUCTOR
// Main 3-step constructor logic

class QuantumConstructor {
    constructor() {
        this.currentStep = 1;
        this.userData = {
            businessQuestion: '',
            analysisDepth: 'strategic',
            presetType: null,
            timestamp: new Date().toISOString()
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedData();
        this.updateProgress();
        console.log('🎯 Quantum Constructor initialized');
    }

    bindEvents() {
        // Start constructor button
        matrixUtils.$('#start-constructor').addEventListener('click', () => {
            this.startConstructor();
        });

        // Business question input
        const businessQuestion = matrixUtils.$('#business-question');
        businessQuestion.addEventListener('input', (e) => {
            this.handleBusinessQuestion(e.target.value);
        });

        // Character counter
        businessQuestion.addEventListener('input', this.updateCharCounter.bind(this));

        // Preset cards
        matrixUtils.$$('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                this.handlePresetSelect(card);
            });
        });

        // Depth options
        matrixUtils.$$('.depth-option').forEach(option => {
            option.addEventListener('click', () => {
                this.handleDepthSelect(option);
            });
        });

        // Navigation buttons
        matrixUtils.$$('.next-step').forEach(button => {
            button.addEventListener('click', (e) => {
                const nextStep = parseInt(e.target.dataset.next);
                this.nextStep(nextStep);
            });
        });

        matrixUtils.$$('.prev-step').forEach(button => {
            button.addEventListener('click', (e) => {
                const prevStep = parseInt(e.target.dataset.prev);
                this.previousStep(prevStep);
            });
        });

        // Restart constructor
        matrixUtils.$('#restart-constructor').addEventListener('click', () => {
            this.restartConstructor();
        });

        // Generate proposal
        matrixUtils.$('#generate-proposal').addEventListener('click', () => {
            this.generateProposal();
        });

        // Expert consultation
        matrixUtils.$('#expert-consult').addEventListener('click', () => {
            this.requestExpertConsultation();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    startConstructor() {
        const heroSection = matrixUtils.$('.quantum-hero');
        const constructorSection = matrixUtils.$('#constructor-section');
        
        // Animate hero section out
        matrixUtils.animateElement(heroSection, 'fadeOut', 500).then(() => {
            heroSection.style.display = 'none';
            constructorSection.style.display = 'block';
            
            // Animate constructor section in
            matrixUtils.animateElement(constructorSection, 'quantumFadeIn', 500);
            
            // Update progress
            this.updateProgress();
        });
    }

    handleBusinessQuestion(question) {
        this.userData.businessQuestion = question.trim();
        
        // Validate and enable/disable next button
        const validation = matrixUtils.validateBusinessQuestion(question);
        const nextButton = matrixUtils.$('.next-step[data-next="2"]');
        
        if (validation.isValid) {
            nextButton.disabled = false;
            nextButton.classList.remove('quantum-error');
        } else {
            nextButton.disabled = true;
            if (question.length > 0) {
                nextButton.classList.add('quantum-error');
            }
        }
        
        // Save to localStorage
        matrixUtils.saveToLocalStorage('businessQuestion', this.userData.businessQuestion);
    }

    updateCharCounter() {
        const textarea = matrixUtils.$('#business-question');
        const counter = matrixUtils.$('#char-count');
        const count = textarea.value.length;
        
        counter.textContent = count;
        
        // Update color based on count
        if (count > 450) {
            counter.style.color = 'var(--matrix-error)';
        } else if (count > 300) {
            counter.style.color = 'var(--matrix-warning)';
        } else {
            counter.style.color = 'var(--matrix-text-secondary)';
        }
    }

    handlePresetSelect(selectedCard) {
        // Remove selected class from all cards
        matrixUtils.$$('.preset-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        selectedCard.classList.add('selected');
        
        // Set preset type
        this.userData.presetType = selectedCard.dataset.preset;
        
        // Auto-fill business question based on preset
        const questionTextarea = matrixUtils.$('#business-question');
        const presetQuestions = {
            'market-size': 'Comprehensive analysis of market size, growth trends, and segmentation in [Industry]',
            'competitors': 'Detailed competitive landscape analysis and market share distribution in [Industry]',
            'entry-strategy': 'Strategic market entry plan and opportunity assessment for [Industry/Market]'
        };
        
        if (presetQuestions[this.userData.presetType]) {
            questionTextarea.value = presetQuestions[this.userData.presetType];
            this.handleBusinessQuestion(questionTextarea.value);
        }
        
        // Enable next button
        const nextButton = matrixUtils.$('.next-step[data-next="2"]');
        nextButton.disabled = false;
        
        // Save to localStorage
        matrixUtils.saveToLocalStorage('presetType', this.userData.presetType);
    }

    handleDepthSelect(selectedOption) {
        // Remove selected class from all options
        matrixUtils.$$('.depth-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        selectedOption.classList.add('selected');
        
        // Set analysis depth
        this.userData.analysisDepth = selectedOption.dataset.depth;
        
        // Update preview with new depth
        this.updatePreview();
        
        // Save to localStorage
        matrixUtils.saveToLocalStorage('analysisDepth', this.userData.analysisDepth);
    }

    nextStep(targetStep) {
        // Validate current step before proceeding
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        const currentStepElement = matrixUtils.$(`[data-step="${this.currentStep}"]`);
        const targetStepElement = matrixUtils.$(`[data-step="${targetStep}"]`);
        
        // Animate current step out
        matrixUtils.animateElement(currentStepElement, 'fadeOut', 300).then(() => {
            currentStepElement.classList.remove('active');
            targetStepElement.classList.add('active');
            
            // Animate next step in
            matrixUtils.animateElement(targetStepElement, 'quantumFadeIn', 300);
            
            // Update current step and progress
            this.currentStep = targetStep;
            this.updateProgress();
            
            // Step-specific initialization
            this.initializeStep(targetStep);
        });
    }

    previousStep(targetStep) {
        const currentStepElement = matrixUtils.$(`[data-step="${this.currentStep}"]`);
        const targetStepElement = matrixUtils.$(`[data-step="${targetStep}"]`);
        
        // Animate current step out
        matrixUtils.animateElement(currentStepElement, 'fadeOut', 300).then(() => {
            currentStepElement.classList.remove('active');
            targetStepElement.classList.add('active');
            
            // Animate previous step in
            matrixUtils.animateElement(targetStepElement, 'quantumFadeIn', 300);
            
            // Update current step and progress
            this.currentStep = targetStep;
            this.updateProgress();
        });
    }

    validateStep(step) {
        switch (step) {
            case 1:
                const question = this.userData.businessQuestion;
                const validation = matrixUtils.validateBusinessQuestion(question);
                
                if (!validation.isValid) {
                    matrixUtils.showError(validation.message, matrixUtils.$('#business-question'));
                    return false;
                }
                return true;
                
            case 2:
                if (!this.userData.analysisDepth) {
                    matrixUtils.showError('Please select an analysis depth');
                    return false;
                }
                return true;
                
            default:
                return true;
        }
    }

    initializeStep(step) {
        switch (step) {
            case 3:
                this.initializePreviewStep();
                break;
        }
    }

    initializePreviewStep() {
        // Update preview date
        matrixUtils.$('#preview-date').textContent = this.userData.timestamp;
        
        // Update preview client (simulated)
        matrixUtils.$('#preview-client').textContent = 'Confidential Client Data';
        
        // Update proposal details
        this.updateProposalDetails();
        
        // Generate dynamic insight
        this.generateDynamicInsight();
        
        // Animate TOC items sequentially
        this.animateTOCItems();
    }

    updateProposalDetails() {
        const depthConfig = {
            'strategic': { timeline: '3-5 days', price: 2500 },
            'deep': { timeline: '7-10 days', price: 5000 },
            'quantum': { timeline: '14 days', price: 8500 }
        };
        
        const config = depthConfig[this.userData.analysisDepth];
        
        // Update proposal elements
        matrixUtils.$('#proposal-depth').textContent = 
            this.userData.analysisDepth.charAt(0).toUpperCase() + 
            this.userData.analysisDepth.slice(1) + ' Analysis';
            
        matrixUtils.$('#proposal-timeline').textContent = config.timeline;
        matrixUtils.$('#proposal-price').textContent = matrixUtils.formatCurrency(config.price);
    }

    generateDynamicInsight() {
        const insightElement = matrixUtils.$('#dynamic-insight');
        
        // Show loading state
        insightElement.innerHTML = '<div class="loading-pulse">Analyzing market patterns...</div>';
        
        // Simulate AI analysis delay
        setTimeout(() => {
            const insight = matrixUtils.generateRandomInsight(this.userData.businessQuestion);
            insightElement.innerHTML = `
                <div class="insight-card quantum-reveal">
                    <div class="insight-icon">🔍</div>
                    <div class="insight-text">
                        <p>${insight}</p>
                        <div class="insight-meta">
                            <span class="confidence">92% confidence</span>
                            <span class="source">Based on 200+ data sources</span>
                        </div>
                    </div>
                </div>
            `;
        }, 1500);
    }

    animateTOCItems() {
        const tocItems = matrixUtils.$$('.toc-item');
        
        tocItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('stagger-item');
            }, index * 200);
        });
    }

    updateProgress() {
        const progressFill = matrixUtils.$('.progress-fill');
        const stepIndicators = matrixUtils.$$('.step-indicator');
        
        // Calculate progress percentage
        const progressPercentage = ((this.currentStep - 1) / 2) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.dataset.progress = progressPercentage;
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = parseInt(indicator.dataset.step);
            
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        });
    }

    updatePreview() {
        // Update any real-time preview elements when data changes
        if (this.currentStep === 3) {
            this.updateProposalDetails();
        }
    }

    loadSavedData() {
        // Load business question
        const savedQuestion = matrixUtils.getFromLocalStorage('businessQuestion');
        if (savedQuestion) {
            matrixUtils.$('#business-question').value = savedQuestion;
            this.userData.businessQuestion = savedQuestion;
            this.handleBusinessQuestion(savedQuestion);
        }
        
        // Load preset type
        const savedPreset = matrixUtils.getFromLocalStorage('presetType');
        if (savedPreset) {
            this.userData.presetType = savedPreset;
            const presetCard = matrixUtils.$(`[data-preset="${savedPreset}"]`);
            if (presetCard) {
                presetCard.classList.add('selected');
            }
        }
        
        // Load analysis depth
        const savedDepth = matrixUtils.getFromLocalStorage('analysisDepth');
        if (savedDepth) {
            this.userData.analysisDepth = savedDepth;
            const depthOption = matrixUtils.$(`[data-depth="${savedDepth}"]`);
            if (depthOption) {
                depthOption.classList.add('selected');
            }
        }
    }

    handleKeyboardNavigation(e) {
        // Only handle keyboard nav in constructor mode
        const constructorSection = matrixUtils.$('#constructor-section');
        if (!constructorSection || constructorSection.style.display === 'none') {
            return;
        }
        
        switch (e.key) {
            case 'ArrowRight':
                if (this.currentStep < 3) {
                    e.preventDefault();
                    this.nextStep(this.currentStep + 1);
                }
                break;
                
            case 'ArrowLeft':
                if (this.currentStep > 1) {
                    e.preventDefault();
                    this.previousStep(this.currentStep - 1);
                }
                break;
                
            case 'Escape':
                this.restartConstructor();
                break;
        }
    }

    restartConstructor() {
        if (confirm('Are you sure you want to start over? All current progress will be lost.')) {
            // Reset user data
            this.userData = {
                businessQuestion: '',
                analysisDepth: 'strategic',
                presetType: null,
                timestamp: new Date().toISOString()
            };
            
            // Clear form
            matrixUtils.$('#business-question').value = '';
            matrixUtils.$$('.preset-card').forEach(card => card.classList.remove('selected'));
            matrixUtils.$$('.depth-option').forEach(option => {
                option.classList.remove('selected');
                if (option.dataset.depth === 'strategic') {
                    option.classList.add('selected');
                }
            });
            
            // Reset to step 1
            matrixUtils.$$('.constructor-step').forEach(step => step.classList.remove('active'));
            matrixUtils.$('[data-step="1"]').classList.add('active');
            this.currentStep = 1;
            this.updateProgress();
            
            // Clear localStorage
            matrixUtils.clearLocalStorage();
            
            console.log('🔄 Constructor restarted');
        }
    }

    generateProposal() {
        // Validate all data
        if (!this.validateStep(1) || !this.validateStep(2)) {
            matrixUtils.showError('Please complete all steps before generating proposal');
            return;
        }
        
        // Show loading state
        const generateBtn = matrixUtils.$('#generate-proposal');
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '⏳ Generating...';
        generateBtn.disabled = true;
        
        // Simulate proposal generation
        setTimeout(() => {
            // In a real implementation, this would generate and download a PDF
            console.log('📄 Generating proposal with data:', this.userData);
            
            // Show success message
            matrixUtils.animateElement(generateBtn, 'quantumSuccess', 600);
            generateBtn.innerHTML = '✅ Proposal Generated!';
            
            // Reset button after delay
            setTimeout(() => {
                generateBtn.innerHTML = originalText;
                generateBtn.disabled = false;
            }, 2000);
            
            // Here you would typically:
            // 1. Send data to backend
            // 2. Generate PDF
            // 3. Send email to client
            // 4. Show confirmation
            
        }, 2000);
    }

    requestExpertConsultation() {
        // Prepare consultation request data
        const consultationData = {
            ...this.userData,
            type: 'expert_consultation',
            requestedAt: new Date().toISOString()
        };
        
        console.log('💬 Expert consultation requested:', consultationData);
        
        // Show confirmation
        alert('Thank you for your interest! Our expert will contact you within 24 hours to discuss your project.');
        
        // In real implementation, this would:
        // 1. Send data to CRM
        // 2. Notify sales team
        // 3. Send confirmation email
    }

    // Public method to get current state
    getState() {
        return {
            currentStep: this.currentStep,
            userData: { ...this.userData },
            progress: ((this.currentStep - 1) / 2) * 100
        };
    }

    // Public method to set data (for integrations)
    setUserData(key, value) {
        if (key in this.userData) {
            this.userData[key] = value;
            matrixUtils.saveToLocalStorage(key, value);
            this.updatePreview();
            return true;
        }
        return false;
    }
}

// Initialize constructor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.matrixConstructor = new QuantumConstructor();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumConstructor;
}