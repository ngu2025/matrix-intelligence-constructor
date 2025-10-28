// MATRIX INTELLIGENCE COST CALCULATOR
// Dynamic pricing and cost calculations

class CostCalculator {
    constructor() {
        this.pricingMatrix = {
            // Base prices for different analysis depths
            strategic: {
                basePrice: 2500,
                currency: 'USD',
                timeline: '3-5 days',
                features: [
                    'Market size and key trends',
                    'Main players and market shares', 
                    'Strategic recommendations',
                    'Executive summary',
                    'Basic competitive analysis'
                ]
            },
            deep: {
                basePrice: 5000,
                currency: 'USD',
                timeline: '7-10 days',
                features: [
                    'Everything in Strategic Overview',
                    'Detailed market segmentation',
                    'Competitor SWOT analysis',
                    'Customer journey mapping',
                    '3-year forecasts',
                    'Risk assessment',
                    'Implementation roadmap'
                ]
            },
            quantum: {
                basePrice: 8500,
                currency: 'USD',
                timeline: '14 days',
                features: [
                    'Everything in Deep Analysis',
                    'AI trend forecasting',
                    'Scenario modeling',
                    'Risk intelligence matrix',
                    'Personalized strategy',
                    'Real-time data integration',
                    'Quarterly updates included',
                    'Dedicated analyst support'
                ]
            }
        };

        this.modifiers = {
            // Industry complexity multipliers
            industry: {
                'technology': 1.2,
                'finance': 1.3,
                'healthcare': 1.4,
                'manufacturing': 1.0,
                'retail': 0.9,
                'energy': 1.5,
                'default': 1.0
            },
            
            // Geographic scope multipliers
            geography: {
                'local': 0.8,
                'regional': 1.0,
                'national': 1.3,
                'global': 1.8,
                'default': 1.0
            },
            
            // Urgency multipliers
            urgency: {
                'standard': 1.0,
                'expedited': 1.5,
                'urgent': 2.0,
                'default': 1.0
            },
            
            // Data complexity multipliers
            dataComplexity: {
                'low': 0.9,
                'medium': 1.0,
                'high': 1.4,
                'extreme': 2.0,
                'default': 1.0
            }
        };

        this.init();
    }

    init() {
        console.log('💰 Cost Calculator initialized');
    }

    calculateCost(analysisDepth, options = {}) {
        // Validate analysis depth
        if (!this.pricingMatrix[analysisDepth]) {
            console.error('Invalid analysis depth:', analysisDepth);
            return this.getDefaultPricing();
        }

        const basePricing = this.pricingMatrix[analysisDepth];
        let finalPrice = basePricing.basePrice;

        // Apply modifiers
        finalPrice = this.applyIndustryModifier(finalPrice, options.industry);
        finalPrice = this.applyGeographyModifier(finalPrice, options.geography);
        finalPrice = this.applyUrgencyModifier(finalPrice, options.urgency);
        finalPrice = this.applyDataComplexityModifier(finalPrice, options.dataComplexity);
        finalPrice = this.applyCustomModifiers(finalPrice, options.customModifiers);

        // Round to nearest 100
        finalPrice = Math.round(finalPrice / 100) * 100;

        return {
            basePrice: basePricing.basePrice,
            finalPrice: finalPrice,
            currency: basePricing.currency,
            timeline: this.calculateTimeline(basePricing.timeline, options.urgency),
            features: basePricing.features,
            modifiers: this.getAppliedModifiers(options),
            savings: basePricing.basePrice - finalPrice > 0 ? basePricing.basePrice - finalPrice : 0,
            discountPercentage: this.calculateDiscountPercentage(basePricing.basePrice, finalPrice)
        };
    }

    applyIndustryModifier(basePrice, industry = 'default') {
        const multiplier = this.modifiers.industry[industry] || this.modifiers.industry.default;
        return basePrice * multiplier;
    }

    applyGeographyModifier(basePrice, geography = 'default') {
        const multiplier = this.modifiers.geography[geography] || this.modifiers.geography.default;
        return basePrice * multiplier;
    }

    applyUrgencyModifier(basePrice, urgency = 'standard') {
        const multiplier = this.modifiers.urgency[urgency] || this.modifiers.urgency.default;
        return basePrice * multiplier;
    }

    applyDataComplexityModifier(basePrice, complexity = 'medium') {
        const multiplier = this.modifiers.dataComplexity[complexity] || this.modifiers.dataComplexity.default;
        return basePrice * multiplier;
    }

    applyCustomModifiers(basePrice, customModifiers = []) {
        let modifiedPrice = basePrice;
        
        customModifiers.forEach(modifier => {
            if (modifier.type === 'percentage') {
                modifiedPrice *= (1 + modifier.value / 100);
            } else if (modifier.type === 'fixed') {
                modifiedPrice += modifier.value;
            } else if (modifier.type === 'multiplier') {
                modifiedPrice *= modifier.value;
            }
        });

        return modifiedPrice;
    }

    calculateTimeline(baseTimeline, urgency = 'standard') {
        const timelineMap = {
            '3-5 days': {
                'standard': '3-5 days',
                'expedited': '2-3 days',
                'urgent': '24-48 hours'
            },
            '7-10 days': {
                'standard': '7-10 days',
                'expedited': '5-7 days',
                'urgent': '3-5 days'
            },
            '14 days': {
                'standard': '14 days',
                'expedited': '10-12 days',
                'urgent': '7-9 days'
            }
        };

        // Extract base timeline key
        const baseKey = Object.keys(timelineMap).find(key => key === baseTimeline);
        if (!baseKey) return baseTimeline;

        return timelineMap[baseKey][urgency] || timelineMap[baseKey].standard;
    }

    getAppliedModifiers(options) {
        const applied = [];
        
        if (options.industry && options.industry !== 'default') {
            applied.push({
                type: 'industry',
                value: this.modifiers.industry[options.industry],
                description: `${this.formatIndustryName(options.industry)} complexity`
            });
        }
        
        if (options.geography && options.geography !== 'default') {
            applied.push({
                type: 'geography',
                value: this.modifiers.geography[options.geography],
                description: `${options.geography.charAt(0).toUpperCase() + options.geography.slice(1)} scope`
            });
        }
        
        if (options.urgency && options.urgency !== 'standard') {
            applied.push({
                type: 'urgency',
                value: this.modifiers.urgency[options.urgency],
                description: `${options.urgency.charAt(0).toUpperCase() + options.urgency.slice(1)} delivery`
            });
        }
        
        if (options.dataComplexity && options.dataComplexity !== 'medium') {
            applied.push({
                type: 'dataComplexity',
                value: this.modifiers.dataComplexity[options.dataComplexity],
                description: `${options.dataComplexity.charAt(0).toUpperCase() + options.dataComplexity.slice(1)} data complexity`
            });
        }

        return applied;
    }

    calculateDiscountPercentage(basePrice, finalPrice) {
        if (finalPrice >= basePrice) return 0;
        return Math.round(((basePrice - finalPrice) / basePrice) * 100);
    }

    formatIndustryName(industry) {
        const industryNames = {
            'technology': 'Technology',
            'finance': 'Financial Services',
            'healthcare': 'Healthcare',
            'manufacturing': 'Manufacturing',
            'retail': 'Retail',
            'energy': 'Energy',
            'default': 'Standard'
        };
        
        return industryNames[industry] || industry.charAt(0).toUpperCase() + industry.slice(1);
    }

    getDefaultPricing() {
        return {
            basePrice: 2500,
            finalPrice: 2500,
            currency: 'USD',
            timeline: '3-5 days',
            features: this.pricingMatrix.strategic.features,
            modifiers: [],
            savings: 0,
            discountPercentage: 0
        };
    }

    // Method to generate pricing breakdown for UI
    generatePricingBreakdown(analysisDepth, options = {}) {
        const costCalculation = this.calculateCost(analysisDepth, options);
        
        return {
            summary: {
                package: analysisDepth.charAt(0).toUpperCase() + analysisDepth.slice(1) + ' Analysis',
                finalPrice: costCalculation.finalPrice,
                currency: costCalculation.currency,
                timeline: costCalculation.timeline,
                basePrice: costCalculation.basePrice,
                savings: costCalculation.savings,
                discountPercentage: costCalculation.discountPercentage
            },
            breakdown: {
                basePackage: {
                    label: 'Base Analysis Package',
                    amount: costCalculation.basePrice
                },
                modifiers: costCalculation.modifiers.map(modifier => ({
                    label: modifier.description,
                    amount: Math.round((costCalculation.basePrice * modifier.value) - costCalculation.basePrice),
                    multiplier: modifier.value
                }))
            },
            features: costCalculation.features,
            total: costCalculation.finalPrice
        };
    }

    // Method to estimate cost based on business question analysis
    estimateCostFromQuestion(businessQuestion) {
        // Simple NLP-like analysis for cost estimation
        const question = businessQuestion.toLowerCase();
        
        // Default options
        let options = {
            industry: 'default',
            geography: 'regional',
            urgency: 'standard',
            dataComplexity: 'medium'
        };

        // Industry detection
        const industryKeywords = {
            'technology': ['tech', 'software', 'ai', 'machine learning', 'blockchain', 'cloud', 'saas'],
            'finance': ['finance', 'banking', 'fintech', 'investment', 'crypto', 'wealth', 'insurance'],
            'healthcare': ['healthcare', 'medical', 'pharma', 'biotech', 'hospital', 'clinical'],
            'manufacturing': ['manufacturing', 'production', 'factory', 'supply chain', 'logistics'],
            'retail': ['retail', 'ecommerce', 'consumer', 'shopping', 'marketplace'],
            'energy': ['energy', 'renewable', 'solar', 'wind', 'oil', 'gas', 'utilities']
        };

        for (const [industry, keywords] of Object.entries(industryKeywords)) {
            if (keywords.some(keyword => question.includes(keyword))) {
                options.industry = industry;
                break;
            }
        }

        // Geography detection
        const geographyKeywords = {
            'global': ['global', 'worldwide', 'international', 'across continents'],
            'national': ['national', 'country', 'domestic', 'federal'],
            'local': ['local', 'city', 'regional', 'municipal', 'state']
        };

        for (const [geography, keywords] of Object.entries(geographyKeywords)) {
            if (keywords.some(keyword => question.includes(keyword))) {
                options.geography = geography;
                break;
            }
        }

        // Complexity detection
        const complexityIndicators = {
            'high': ['deep', 'comprehensive', 'detailed', 'thorough', 'extensive', 'in-depth'],
            'extreme': ['quantum', 'ai-powered', 'predictive', 'scenario', 'modeling', 'forecast']
        };

        for (const [complexity, indicators] of Object.entries(complexityIndicators)) {
            if (indicators.some(indicator => question.includes(indicator))) {
                options.dataComplexity = complexity;
                break;
            }
        }

        // Analysis depth recommendation based on question complexity
        let recommendedDepth = 'strategic';
        const wordCount = businessQuestion.split(' ').length;
        const hasComplexTerms = question.includes('competitive') || question.includes('market share') || 
                               question.includes('growth') || question.includes('trend');

        if (wordCount > 20 && hasComplexTerms) {
            recommendedDepth = 'deep';
        }

        if (question.includes('quantum') || question.includes('ai') || question.includes('predict')) {
            recommendedDepth = 'quantum';
        }

        return {
            recommendedDepth: recommendedDepth,
            estimatedOptions: options,
            costEstimate: this.calculateCost(recommendedDepth, options),
            confidence: this.calculateEstimationConfidence(businessQuestion)
        };
    }

    calculateEstimationConfidence(question) {
        // Simple confidence calculation based on question specificity
        let confidence = 50; // Base confidence
        
        // Increase confidence for specific terms
        const specificTerms = ['market', 'analysis', 'competitor', 'growth', 'size', 'trend'];
        const foundTerms = specificTerms.filter(term => question.toLowerCase().includes(term));
        
        confidence += foundTerms.length * 10;
        confidence = Math.min(confidence, 95);
        
        return confidence;
    }

    // Method to get all available packages with pricing
    getAllPackages() {
        return Object.keys(this.pricingMatrix).map(depth => {
            const basePricing = this.pricingMatrix[depth];
            return {
                id: depth,
                name: depth.charAt(0).toUpperCase() + depth.slice(1) + ' Analysis',
                basePrice: basePricing.basePrice,
                currency: basePricing.currency,
                timeline: basePricing.timeline,
                features: basePricing.features,
                description: this.getPackageDescription(depth)
            };
        });
    }

    getPackageDescription(depth) {
        const descriptions = {
            strategic: 'Essential market insights for strategic decision-making',
            deep: 'Comprehensive analysis for detailed market understanding', 
            quantum: 'AI-powered predictive intelligence for competitive advantage'
        };
        
        return descriptions[depth] || 'Professional market analysis service';
    }

    // Method to validate cost calculation
    validateCostCalculation(costData) {
        const requiredFields = ['basePrice', 'finalPrice', 'currency', 'timeline'];
        const missingFields = requiredFields.filter(field => !costData[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        if (costData.finalPrice < 0) {
            throw new Error('Final price cannot be negative');
        }

        if (!['USD', 'EUR', 'GBP'].includes(costData.currency)) {
            throw new Error('Unsupported currency');
        }

        return true;
    }
}

// Initialize cost calculator
const costCalculator = new CostCalculator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CostCalculator, costCalculator };
}