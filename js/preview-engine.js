// MATRIX INTELLIGENCE PREVIEW ENGINE
// Dynamic report preview generation

class PreviewEngine {
    constructor() {
        this.previewData = null;
        this.insightTemplates = {};
        this.init();
    }

    init() {
        this.loadInsightTemplates();
        console.log('🔮 Preview Engine initialized');
    }

    loadInsightTemplates() {
        this.insightTemplates = {
            marketSize: {
                title: "Market Size Analysis",
                template: (data) => `
                    <div class="insight-card market-insight">
                        <div class="insight-header">
                            <span class="insight-icon">📊</span>
                            <h5>Market Size & Growth</h5>
                            <span class="confidence-badge">${data.confidence || 92}% confidence</span>
                        </div>
                        <div class="insight-content">
                            <div class="metric-grid">
                                <div class="metric">
                                    <label>Current Market Size</label>
                                    <span class="value">${data.currentSize || '$2.4B'}</span>
                                </div>
                                <div class="metric">
                                    <label>Projected Growth (CAGR)</label>
                                    <span class="value positive">+${data.growthRate || 23}%</span>
                                </div>
                                <div class="metric">
                                    <label>2025 Projection</label>
                                    <span class="value">${data.projection || '$3.8B'}</span>
                                </div>
                            </div>
                            <div class="insight-text">
                                <p>The ${data.industry || 'target'} market demonstrates strong growth potential with increasing adoption of ${data.technology || 'digital solutions'}.</p>
                            </div>
                        </div>
                    </div>
                `
            },

            competitiveLandscape: {
                title: "Competitive Analysis", 
                template: (data) => `
                    <div class="insight-card competitive-insight">
                        <div class="insight-header">
                            <span class="insight-icon">⚔️</span>
                            <h5>Competitive Landscape</h5>
                            <span class="confidence-badge">${data.confidence || 88}% confidence</span>
                        </div>
                        <div class="insight-content">
                            <div class="competitor-list">
                                ${(data.topCompetitors || ['Leader Inc.', 'Market Giant Co.', 'Innovator Labs']).map((competitor, index) => `
                                    <div class="competitor-item">
                                        <span class="rank">#${index + 1}</span>
                                        <span class="name">${competitor}</span>
                                        <span class="market-share">${(25 - index * 5)}%</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="insight-text">
                                <p>The market is ${data.competitionLevel || 'moderately'} concentrated with clear leaders establishing strong positions.</p>
                            </div>
                        </div>
                    </div>
                `
            },

            growthDrivers: {
                title: "Growth Drivers",
                template: (data) => `
                    <div class="insight-card drivers-insight">
                        <div class="insight-header">
                            <span class="insight-icon">🚀</span>
                            <h5>Key Growth Drivers</h5>
                            <span class="confidence-badge">${data.confidence || 85}% confidence</span>
                        </div>
                        <div class="insight-content">
                            <div class="drivers-list">
                                ${(data.drivers || [
                                    'Digital transformation initiatives',
                                    'Increasing consumer demand', 
                                    'Regulatory changes',
                                    'Technology innovation'
                                ]).map(driver => `
                                    <div class="driver-item">
                                        <span class="driver-icon">✓</span>
                                        <span>${driver}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="impact-metrics">
                                <div class="impact-item">
                                    <label>Market Impact</label>
                                    <span class="value high">High</span>
                                </div>
                                <div class="impact-item">
                                    <label>Time Horizon</label>
                                    <span class="value">2-3 years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },

            riskAssessment: {
                title: "Risk Analysis",
                template: (data) => `
                    <div class="insight-card risk-insight">
                        <div class="insight-header">
                            <span class="insight-icon">⚠️</span>
                            <h5>Risk Assessment</h5>
                            <span class="confidence-badge">${data.confidence || 82}% confidence</span>
                        </div>
                        <div class="insight-content">
                            <div class="risk-matrix">
                                <div class="risk-item high">
                                    <span class="risk-level">High Risk</span>
                                    <span class="risk-factor">Regulatory changes</span>
                                </div>
                                <div class="risk-item medium">
                                    <span class="risk-level">Medium Risk</span>
                                    <span class="risk-factor">Economic volatility</span>
                                </div>
                                <div class="risk-item low">
                                    <span class="risk-level">Low Risk</span>
                                    <span class="risk-factor">Technology disruption</span>
                                </div>
                            </div>
                            <div class="insight-text">
                                <p>Primary risks are manageable with proper strategic planning and monitoring.</p>
                            </div>
                        </div>
                    </div>
                `
            },

            strategicRecommendation: {
                title: "Strategic Recommendations", 
                template: (data) => `
                    <div class="insight-card strategy-insight">
                        <div class="insight-header">
                            <span class="insight-icon">💡</span>
                            <h5>Strategic Recommendations</h5>
                            <span class="confidence-badge">${data.confidence || 90}% confidence</span>
                        </div>
                        <div class="insight-content">
                            <div class="recommendations">
                                ${(data.recommendations || [
                                    'Focus on digital customer acquisition channels',
                                    'Develop strategic partnerships in emerging markets',
                                    'Invest in AI-driven market intelligence',
                                    'Optimize pricing strategy for competitive positioning'
                                ]).map(rec => `
                                    <div class="recommendation-item">
                                        <span class="rec-icon">🎯</span>
                                        <span>${rec}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="priority-indicator">
                                <span class="priority-label">Priority Level:</span>
                                <span class="priority-value high">High</span>
                            </div>
                        </div>
                    </div>
                `
            }
        };
    }

    generatePreview(userData, analysisDepth) {
        this.previewData = {
            ...userData,
            analysisDepth: analysisDepth,
            generatedAt: new Date().toISOString(),
            previewId: 'preview_' + Date.now()
        };

        return this.createPreviewStructure();
    }

    createPreviewStructure() {
        const depthConfig = {
            strategic: ['marketSize', 'competitiveLandscape'],
            deep: ['marketSize', 'competitiveLandscape', 'growthDrivers', 'riskAssessment'],
            quantum: ['marketSize', 'competitiveLandscape', 'growthDrivers', 'riskAssessment', 'strategicRecommendation']
        };

        const availableInsights = depthConfig[this.previewData.analysisDepth] || depthConfig.strategic;
        
        return {
            previewId: this.previewData.previewId,
            generatedAt: this.previewData.generatedAt,
            businessQuestion: this.previewData.businessQuestion,
            analysisDepth: this.previewData.analysisDepth,
            insights: availableInsights.map(insightKey => 
                this.generateInsight(insightKey, this.previewData)
            ),
            summary: this.generateExecutiveSummary(),
            metadata: this.generatePreviewMetadata()
        };
    }

    generateInsight(insightKey, data) {
        const template = this.insightTemplates[insightKey];
        if (!template) {
            console.warn(`Unknown insight template: ${insightKey}`);
            return null;
        }

        // Enhance data with dynamic values based on business question
        const enhancedData = this.enhanceDataWithAI(data, insightKey);
        
        return {
            type: insightKey,
            title: template.title,
            content: template.template(enhancedData),
            confidence: enhancedData.confidence,
            generatedAt: new Date().toISOString()
        };
    }

    enhanceDataWithAI(baseData, insightType) {
        // Simulate AI-enhanced data generation
        // In production, this would connect to actual AI services
        
        const enhancements = {
            marketSize: {
                currentSize: this.generateMarketSize(baseData.businessQuestion),
                growthRate: this.generateGrowthRate(baseData.businessQuestion),
                projection: this.generateProjection(baseData.businessQuestion),
                industry: this.extractIndustry(baseData.businessQuestion),
                technology: this.extractTechnologyTrend(baseData.businessQuestion),
                confidence: 85 + Math.floor(Math.random() * 15)
            },
            competitiveLandscape: {
                topCompetitors: this.generateCompetitorList(baseData.businessQuestion),
                competitionLevel: this.assessCompetitionLevel(baseData.businessQuestion),
                confidence: 80 + Math.floor(Math.random() * 20)
            },
            growthDrivers: {
                drivers: this.identifyGrowthDrivers(baseData.businessQuestion),
                confidence: 82 + Math.floor(Math.random() * 18)
            },
            riskAssessment: {
                confidence: 78 + Math.floor(Math.random() * 22)
            },
            strategicRecommendation: {
                recommendations: this.generateRecommendations(baseData.businessQuestion),
                confidence: 88 + Math.floor(Math.random() * 12)
            }
        };

        return {
            ...baseData,
            ...(enhancements[insightType] || {})
        };
    }

    generateMarketSize(question) {
        const sizes = ['$1.2B', '$2.4B', '$3.8B', '$5.1B', '$7.6B', '$12.3B'];
        const complexity = question.length / 100;
        return sizes[Math.min(Math.floor(complexity * sizes.length), sizes.length - 1)];
    }

    generateGrowthRate(question) {
        const rates = [15, 23, 28, 34, 42, 51];
        const urgency = question.includes('growth') ? 0.8 : 0.3;
        return rates[Math.floor(urgency * rates.length)];
    }

    generateProjection(question) {
        const current = this.generateMarketSize(question);
        const growth = this.generateGrowthRate(question);
        const baseValue = parseInt(current.replace('$', '').replace('B', ''));
        const projected = baseValue * (1 + growth / 100);
        return `$${projected.toFixed(1)}B`;
    }

    extractIndustry(question) {
        const industries = {
            'tech': ['software', 'ai', 'technology', 'digital', 'cloud'],
            'finance': ['finance', 'banking', 'fintech', 'investment'],
            'healthcare': ['health', 'medical', 'pharma', 'healthcare'],
            'retail': ['retail', 'ecommerce', 'consumer', 'shopping']
        };

        for (const [industry, keywords] of Object.entries(industries)) {
            if (keywords.some(keyword => question.toLowerCase().includes(keyword))) {
                return industry;
            }
        }

        return 'general business';
    }

    extractTechnologyTrend(question) {
        const trends = [
            'AI and machine learning',
            'cloud computing',
            'blockchain technology',
            'IoT solutions',
            'digital transformation',
            'automation systems'
        ];

        return trends[Math.floor(Math.random() * trends.length)];
    }

    generateCompetitorList(question) {
        const baseCompetitors = [
            'Industry Leader Inc.',
            'Market Giant Co.',
            'Innovator Labs',
            'Tech Pioneer Group',
            'Digital Solutions Corp.',
            'NextGen Enterprises'
        ];

        // Shuffle and take 3-5 competitors
        return [...baseCompetitors]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3 + Math.floor(Math.random() * 3));
    }

    assessCompetitionLevel(question) {
        const levels = ['fragmented', 'moderate', 'concentrated', 'highly concentrated'];
        return levels[Math.floor(Math.random() * levels.length)];
    }

    identifyGrowthDrivers(question) {
        const allDrivers = [
            'Digital transformation initiatives',
            'Increasing consumer demand for digital services',
            'Regulatory changes and compliance requirements',
            'Technology innovation and adoption',
            'Global market expansion opportunities',
            'Changing consumer behavior patterns',
            'Supply chain optimization',
            'Sustainability and ESG initiatives'
        ];

        return [...allDrivers]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }

    generateRecommendations(question) {
        const allRecommendations = [
            'Focus on digital customer acquisition channels',
            'Develop strategic partnerships in emerging markets',
            'Invest in AI-driven market intelligence capabilities',
            'Optimize pricing strategy for competitive positioning',
            'Enhance digital transformation roadmap',
            'Implement data-driven decision making processes',
            'Explore new market segments and verticals',
            'Strengthen competitive monitoring systems'
        ];

        return [...allRecommendations]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }

    generateExecutiveSummary() {
        return {
            overview: this.createOverviewText(),
            keyFindings: this.generateKeyFindings(),
            opportunitySize: this.calculateOpportunitySize(),
            strategicPriority: this.assessStrategicPriority(),
            nextSteps: this.suggestNextSteps()
        };
    }

    createOverviewText() {
        return `The market analysis reveals significant growth opportunities in the ${this.extractIndustry(this.previewData.businessQuestion)} sector, driven by ${this.extractTechnologyTrend(this.previewData.businessQuestion)}. Current market dynamics favor agile players who can leverage digital transformation for competitive advantage.`;
    }

    generateKeyFindings() {
        return [
            `Market growing at ${this.generateGrowthRate(this.previewData.businessQuestion)}% CAGR`,
            `Clear market leaders with ${25 + Math.floor(Math.random() * 30)}% combined share`,
            `Digital transformation driving ${40 + Math.floor(Math.random() * 35)}% of growth`,
            `Regulatory environment ${Math.random() > 0.5 ? 'favorable' : 'evolving'}`
        ];
    }

    calculateOpportunitySize() {
        const base = parseInt(this.generateMarketSize(this.previewData.businessQuestion).replace('$', '').replace('B', ''));
        const growth = this.generateGrowthRate(this.previewData.businessQuestion);
        return `$${(base * growth / 100).toFixed(1)}B annual opportunity`;
    }

    assessStrategicPriority() {
        const priorities = ['Low', 'Medium', 'High', 'Critical'];
        return priorities[Math.floor(Math.random() * priorities.length)];
    }

    suggestNextSteps() {
        return [
            'Conduct detailed competitive analysis',
            'Validate market entry assumptions',
            'Develop implementation roadmap',
            'Secure executive sponsorship'
        ];
    }

    generatePreviewMetadata() {
        return {
            dataSources: 200 + Math.floor(Math.random() * 100),
            analysisTime: '2-4 hours',
            aiModels: ['Market Pattern Recognition', 'Competitive Intelligence', 'Growth Forecasting'],
            lastUpdated: new Date().toISOString(),
            confidenceScore: 85 + Math.floor(Math.random() * 15)
        };
    }

    // Method to render preview in UI
    renderPreview(previewData, containerElement) {
        if (!containerElement) {
            console.error('Preview container element not found');
            return;
        }

        // Clear existing content
        containerElement.innerHTML = '';

        // Add loading state
        containerElement.innerHTML = this.createLoadingState();

        // Simulate AI processing time
        setTimeout(() => {
            this.renderPreviewContent(previewData, containerElement);
        }, 1500);
    }

    createLoadingState() {
        return `
            <div class="preview-loading">
                <div class="loading-animation">
                    <div class="quantum-spinner"></div>
                    <p>Generating quantum insights...</p>
                </div>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <span class="progress-text">Analyzing market patterns</span>
                </div>
            </div>
        `;
    }

    renderPreviewContent(previewData, containerElement) {
        const previewHTML = `
            <div class="preview-content quantum-reveal">
                <div class="preview-header">
                    <h3>MATRIX INTELLIGENCE PREVIEW</h3>
                    <div class="preview-meta">
                        <span>Generated: ${new Date(previewData.generatedAt).toLocaleDateString()}</span>
                        <span>Confidence: ${previewData.metadata.confidenceScore}%</span>
                    </div>
                </div>

                <div class="executive-summary">
                    <h4>Executive Summary</h4>
                    <p>${previewData.summary.overview}</p>
                    
                    <div class="key-metrics">
                        ${previewData.summary.keyFindings.map(finding => `
                            <div class="metric-item">
                                <span class="metric-icon">✓</span>
                                <span>${finding}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="insights-container">
                    ${previewData.insights.map(insight => insight.content).join('')}
                </div>

                <div class="preview-footer">
                    <div class="data-sources">
                        <strong>Data Sources:</strong> ${previewData.metadata.dataSources}+ verified sources
                    </div>
                    <div class="ai-models">
                        <strong>AI Models:</strong> ${previewData.metadata.aiModels.join(', ')}
                    </div>
                </div>
            </div>
        `;

        containerElement.innerHTML = previewHTML;
        
        // Add CSS for preview elements
        this.injectPreviewStyles();
        
        // Animate elements in sequence
        this.animatePreviewElements(containerElement);
    }

    injectPreviewStyles() {
        if (document.getElementById('preview-styles')) return;

        const styles = `
            <style id="preview-styles">
                .preview-loading {
                    text-align: center;
                    padding: 3rem;
                    color: var(--matrix-text-secondary);
                }
                
                .quantum-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--matrix-border);
                    border-top: 3px solid var(--matrix-accent);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                .insight-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--matrix-border);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    animation: quantumFadeIn 0.6s var(--quantum-ease);
                }
                
                .insight-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    gap: 0.75rem;
                }
                
                .confidence-badge {
                    background: var(--matrix-accent);
                    color: var(--matrix-bg);
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    margin-left: auto;
                }
                
                .metric-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .metric {
                    text-align: center;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                }
                
                .metric .value {
                    display: block;
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--matrix-accent);
                    margin-top: 0.5rem;
                }
                
                .metric .value.positive {
                    color: var(--matrix-success);
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    animatePreviewElements(container) {
        const elements = container.querySelectorAll('.insight-card, .executive-summary');
        
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('stagger-item');
        });
    }

    // Method to export preview as JSON
    exportPreview(previewData, format = 'json') {
        if (format === 'json') {
            const dataStr = JSON.stringify(previewData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            matrixUtils.downloadBlob(
                dataBlob, 
                `matrix-preview-${previewData.previewId}.json`
            );
        }
        
        // Could add PDF export here in future
    }

    // Method to validate preview data
    validatePreviewData(previewData) {
        const required = ['previewId', 'generatedAt', 'businessQuestion', 'insights'];
        const missing = required.filter(field => !previewData[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required preview fields: ${missing.join(', ')}`);
        }
        
        return true;
    }
}

// Initialize preview engine
const previewEngine = new PreviewEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PreviewEngine, previewEngine };
}