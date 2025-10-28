// MATRIX INTELLIGENCE PROPOSAL GENERATOR
// Commercial proposal and document generation

class ProposalGenerator {
    constructor() {
        this.templates = {};
        this.currentProposal = null;
        this.init();
    }

    init() {
        this.loadTemplates();
        console.log('📄 Proposal Generator initialized');
    }

    loadTemplates() {
        this.templates = {
            commercialProposal: (data) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Commercial Proposal - Matrix Intelligence</title>
                    <style>
                        body { 
                            font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; 
                            line-height: 1.6; 
                            color: #1a202c;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 2rem;
                        }
                        .header { 
                            text-align: center; 
                            border-bottom: 3px solid #00dc82;
                            padding-bottom: 1rem;
                            margin-bottom: 2rem;
                        }
                        .logo { 
                            font-size: 2rem; 
                            font-weight: 800; 
                            color: #00dc82;
                            margin-bottom: 0.5rem;
                        }
                        .confidential { 
                            background: #ef4444; 
                            color: white; 
                            padding: 0.5rem 1rem; 
                            border-radius: 6px;
                            font-size: 0.875rem;
                            font-weight: 700;
                            display: inline-block;
                            margin-bottom: 1rem;
                        }
                        .section { 
                            margin-bottom: 2rem; 
                        }
                        .section-title { 
                            color: #00dc82; 
                            border-bottom: 2px solid #e2e8f0;
                            padding-bottom: 0.5rem;
                            margin-bottom: 1rem;
                        }
                        .pricing-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 1rem 0;
                        }
                        .pricing-table th,
                        .pricing-table td {
                            padding: 1rem;
                            text-align: left;
                            border-bottom: 1px solid #e2e8f0;
                        }
                        .pricing-table th {
                            background: #f7fafc;
                            font-weight: 600;
                        }
                        .total-row {
                            background: #00dc82;
                            color: white;
                            font-weight: 700;
                        }
                        .feature-list {
                            list-style: none;
                            padding: 0;
                        }
                        .feature-list li {
                            padding: 0.5rem 0;
                            position: relative;
                            padding-left: 1.5rem;
                        }
                        .feature-list li:before {
                            content: '✓';
                            color: #00dc82;
                            position: absolute;
                            left: 0;
                            font-weight: bold;
                        }
                        .timeline {
                            display: flex;
                            justify-content: space-between;
                            margin: 1rem 0;
                        }
                        .timeline-phase {
                            text-align: center;
                            flex: 1;
                            padding: 1rem;
                            background: #f7fafc;
                            border-radius: 8px;
                            margin: 0 0.5rem;
                        }
                        .contact-info {
                            background: #f7fafc;
                            padding: 1.5rem;
                            border-radius: 8px;
                            margin-top: 2rem;
                        }
                        @media print {
                            body { padding: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="logo">MATRIX INTELLIGENCE</div>
                        <div class="confidential">STRICTLY CONFIDENTIAL</div>
                        <h1>Commercial Proposal</h1>
                        <p>Market Intelligence Report</p>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Project Overview</h2>
                        <p><strong>Client Inquiry:</strong> ${data.businessQuestion}</p>
                        <p><strong>Analysis Package:</strong> ${data.analysisDepth.charAt(0).toUpperCase() + data.analysisDepth.slice(1)} Analysis</p>
                        <p><strong>Proposal Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                        <p><strong>Proposal ID:</strong> ${data.proposalId}</p>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Scope of Work</h2>
                        <ul class="feature-list">
                            ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Project Timeline</h2>
                        <div class="timeline">
                            <div class="timeline-phase">
                                <strong>Phase 1</strong><br>
                                Data Collection<br>
                                Days 1-2
                            </div>
                            <div class="timeline-phase">
                                <strong>Phase 2</strong><br>
                                Analysis & Insights<br>
                                Days 3-${Math.floor(parseInt(data.timeline.split('-')[0]) / 2)}
                            </div>
                            <div class="timeline-phase">
                                <strong>Phase 3</strong><br>
                                Report Generation<br>
                                Days ${Math.floor(parseInt(data.timeline.split('-')[0]) / 2) + 1}-${data.timeline.split('-')[1].split(' ')[0]}
                            </div>
                        </div>
                        <p><strong>Total Duration:</strong> ${data.timeline}</p>
                    </div>

                    <div class="section">
                        <h2 class="section-title">Investment</h2>
                        <table class="pricing-table">
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>Base Analysis</td>
                                <td>${data.analysisDepth.charAt(0).toUpperCase() + data.analysisDepth.slice(1)} Market Intelligence Report</td>
                                <td>${matrixUtils.formatCurrency(data.basePrice)}</td>
                            </tr>
                            ${data.modifiers && data.modifiers.length > 0 ? data.modifiers.map(modifier => `
                                <tr>
                                    <td>${modifier.type.charAt(0).toUpperCase() + modifier.type.slice(1)} Factor</td>
                                    <td>${modifier.description}</td>
                                    <td>${modifier.multiplier > 1 ? '+' : ''}${Math.round((modifier.multiplier - 1) * 100)}%</td>
                                </tr>
                            `).join('') : ''}
                            <tr class="total-row">
                                <td colspan="2"><strong>Total Investment</strong></td>
                                <td><strong>${matrixUtils.formatCurrency(data.finalPrice)}</strong></td>
                            </tr>
                        </table>
                        
                        ${data.savings > 0 ? `
                            <p style="color: #10b981; font-weight: 600;">
                                💰 You save ${matrixUtils.formatCurrency(data.savings)} (${data.discountPercentage}% discount)
                            </p>
                        ` : ''}
                    </div>

                    <div class="section">
                        <h2 class="section-title">Deliverables</h2>
                        <ul class="feature-list">
                            <li>Comprehensive Market Intelligence Report (PDF + Interactive)</li>
                            <li>Executive Summary Presentation</li>
                            <li>Raw Data Appendix</li>
                            <li>30-day Post-Report Support</li>
                            ${data.analysisDepth === 'quantum' ? '<li>Quarterly Market Updates (3 months)</li>' : ''}
                            <li>Dedicated Analyst Consultation</li>
                        </ul>
                    </div>

                    <div class="contact-info">
                        <h3>Next Steps</h3>
                        <p>To proceed with this engagement or discuss customization options, please contact:</p>
                        <p>
                            <strong>Matrix Intelligence Team</strong><br>
                            📧 proposals@matrix-intelligence.com<br>
                            📞 +1 (555) 123-INTEL<br>
                            🌐 www.matrix-intelligence.com
                        </p>
                        <p><em>This proposal is valid for 30 days from the date of issue.</em></p>
                    </div>

                    <div class="no-print" style="margin-top: 3rem; text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
                        <button onclick="window.print()" style="
                            background: #00dc82;
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                            margin-right: 1rem;
                        ">🖨️ Print Proposal</button>
                        <button onclick="downloadProposal()" style="
                            background: #3b82f6;
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                        ">📥 Download PDF</button>
                    </div>

                    <script>
                        function downloadProposal() {
                            alert('In production, this would generate and download a PDF version of the proposal.');
                            // PDF generation would be implemented here
                        }
                    </script>
                </body>
                </html>
            `,

            emailTemplate: (data) => {
                const subject = `Commercial Proposal - Matrix Intelligence - ${data.proposalId}`;
                const body = `
Dear Client,

Thank you for your interest in Matrix Intelligence services. 

We are pleased to present our commercial proposal for the following project:

📊 Project: ${data.businessQuestion.substring(0, 100)}...
📈 Analysis Level: ${data.analysisDepth.charAt(0).toUpperCase() + data.analysisDepth.slice(1)}
💰 Investment: ${matrixUtils.formatCurrency(data.finalPrice)}
⏱️ Timeline: ${data.timeline}

Key Deliverables:
• Comprehensive Market Intelligence Report
• Executive Summary Presentation  
• Raw Data Appendix
• 30-day Post-Report Support
${data.analysisDepth === 'quantum' ? '• Quarterly Market Updates (3 months)' : ''}

Next Steps:
1. Review the attached proposal
2. Schedule a consultation call
3. Provide project approval
4. Kick-off meeting

To proceed or discuss any aspects of this proposal, please reply to this email or contact us at proposals@matrix-intelligence.com.

We look forward to helping you gain competitive market intelligence.

Best regards,

Matrix Intelligence Team
🌐 www.matrix-intelligence.com
📞 +1 (555) 123-INTEL

---
This email and any attachments are confidential and intended solely for the addressed recipient.
                `.trim();

                return { subject, body };
            }
        };
    }

    generateProposal(userData, costCalculation) {
        const proposalId = 'MATRIX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        this.currentProposal = {
            proposalId: proposalId,
            generatedAt: new Date().toISOString(),
            userData: userData,
            costCalculation: costCalculation,
            summary: this.createProposalSummary(userData, costCalculation, proposalId)
        };

        return this.currentProposal;
    }

    createProposalSummary(userData, costCalculation, proposalId) {
        return {
            proposalId: proposalId,
            businessQuestion: userData.businessQuestion,
            analysisDepth: userData.analysisDepth,
            basePrice: costCalculation.basePrice,
            finalPrice: costCalculation.finalPrice,
            currency: costCalculation.currency,
            timeline: costCalculation.timeline,
            features: costCalculation.features,
            modifiers: costCalculation.modifiers,
            savings: costCalculation.savings,
            discountPercentage: costCalculation.discountPercentage
        };
    }

    renderProposal(containerElement = null) {
        if (!this.currentProposal) {
            throw new Error('No proposal generated. Call generateProposal() first.');
        }

        const proposalHTML = this.templates.commercialProposal(this.currentProposal.summary);
        
        if (containerElement) {
            containerElement.innerHTML = proposalHTML;
        }

        return proposalHTML;
    }

    generateEmailProposal() {
        if (!this.currentProposal) {
            throw new Error('No proposal generated. Call generateProposal() first.');
        }

        return this.templates.emailTemplate(this.currentProposal.summary);
    }

    downloadProposal(format = 'html') {
        if (!this.currentProposal) {
            throw new Error('No proposal generated. Call generateProposal() first.');
        }

        switch (format) {
            case 'html':
                this.downloadHTMLProposal();
                break;
            case 'json':
                this.downloadJSONProposal();
                break;
            case 'pdf':
                this.downloadPDFProposal();
                break;
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    downloadHTMLProposal() {
        const proposalHTML = this.renderProposal();
        const blob = new Blob([proposalHTML], { type: 'text/html' });
        const filename = `matrix-proposal-${this.currentProposal.summary.proposalId}.html`;
        
        matrixUtils.downloadBlob(blob, filename);
    }

    downloadJSONProposal() {
        const proposalData = JSON.stringify(this.currentProposal, null, 2);
        const blob = new Blob([proposalData], { type: 'application/json' });
        const filename = `matrix-proposal-${this.currentProposal.summary.proposalId}.json`;
        
        matrixUtils.downloadBlob(blob, filename);
    }

    downloadPDFProposal() {
        // In production, this would use a PDF generation library
        // For now, we'll simulate the behavior
        console.log('📄 PDF generation would be implemented with a library like jsPDF or Puppeteer');
        
        // Simulate PDF download
        setTimeout(() => {
            alert('PDF generation would be implemented in production. For now, please use the HTML version and print to PDF.');
        }, 500);
    }

    sendProposalEmail(clientEmail) {
        if (!this.currentProposal) {
            throw new Error('No proposal generated. Call generateProposal() first.');
        }

        if (!matrixUtils.validateEmail(clientEmail)) {
            throw new Error('Invalid email address');
        }

        const emailData = this.generateEmailProposal();
        
        // In production, this would integrate with an email service
        // For now, we'll simulate the behavior and provide the email content
        
        console.log('📧 Email sending simulation:');
        console.log('To:', clientEmail);
        console.log('Subject:', emailData.subject);
        console.log('Body:', emailData.body);
        
        // Return email data for demonstration
        return {
            to: clientEmail,
            subject: emailData.subject,
            body: emailData.body,
            proposalId: this.currentProposal.summary.proposalId,
            sentAt: new Date().toISOString()
        };
    }

    validateProposalData(proposalData) {
        const requiredFields = [
            'proposalId', 'businessQuestion', 'analysisDepth', 
            'finalPrice', 'timeline', 'features'
        ];

        const missingFields = requiredFields.filter(field => !proposalData[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required proposal fields: ${missingFields.join(', ')}`);
        }

        if (proposalData.finalPrice <= 0) {
            throw new Error('Proposal price must be greater than 0');
        }

        if (!proposalData.features || proposalData.features.length === 0) {
            throw new Error('Proposal must include at least one feature');
        }

        return true;
    }

    // Method to generate proposal from constructor data
    generateFromConstructor(constructorData) {
        if (!constructorData.userData || !constructorData.userData.analysisDepth) {
            throw new Error('Invalid constructor data');
        }

        // Calculate cost
        const costCalculation = costCalculator.calculateCost(
            constructorData.userData.analysisDepth,
            {
                industry: this.extractIndustryFromQuestion(constructorData.userData.businessQuestion),
                geography: 'regional', // Default, could be extracted from question
                urgency: 'standard',
                dataComplexity: 'medium'
            }
        );

        return this.generateProposal(constructorData.userData, costCalculation);
    }

    extractIndustryFromQuestion(question) {
        const industries = {
            'tech': ['software', 'ai', 'technology', 'digital', 'cloud', 'saas'],
            'finance': ['finance', 'banking', 'fintech', 'investment', 'crypto'],
            'healthcare': ['health', 'medical', 'pharma', 'healthcare', 'biotech'],
            'retail': ['retail', 'ecommerce', 'consumer', 'shopping', 'marketplace'],
            'manufacturing': ['manufacturing', 'production', 'factory', 'supply chain']
        };

        const lowerQuestion = question.toLowerCase();
        
        for (const [industry, keywords] of Object.entries(industries)) {
            if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
                return industry;
            }
        }

        return 'default';
    }

    // Method to get proposal statistics
    getProposalStats() {
        const savedProposals = matrixUtils.getFromLocalStorage('proposals') || [];
        
        return {
            totalGenerated: savedProposals.length,
            totalValue: savedProposals.reduce((sum, prop) => sum + prop.summary.finalPrice, 0),
            averageValue: savedProposals.length > 0 ? 
                savedProposals.reduce((sum, prop) => sum + prop.summary.finalPrice, 0) / savedProposals.length : 0,
            mostPopularPackage: this.getMostPopularPackage(savedProposals),
            conversionRate: this.calculateConversionRate(savedProposals)
        };
    }

    getMostPopularPackage(proposals) {
        if (proposals.length === 0) return 'N/A';
        
        const packageCount = {};
        proposals.forEach(prop => {
            const packageName = prop.summary.analysisDepth;
            packageCount[packageName] = (packageCount[packageName] || 0) + 1;
        });
        
        return Object.keys(packageCount).reduce((a, b) => 
            packageCount[a] > packageCount[b] ? a : b
        );
    }

    calculateConversionRate(proposals) {
        // In production, this would check actual conversion data
        // For now, we'll simulate based on proposal value
        const convertedProposals = proposals.filter(prop => 
            prop.summary.finalPrice > 3000
        );
        
        return proposals.length > 0 ? 
            (convertedProposals.length / proposals.length * 100).toFixed(1) + '%' : 
            '0%';
    }

    // Method to save proposal to localStorage
    saveProposal() {
        if (!this.currentProposal) {
            throw new Error('No proposal to save');
        }

        const savedProposals = matrixUtils.getFromLocalStorage('proposals') || [];
        savedProposals.push(this.currentProposal);
        
        matrixUtils.saveToLocalStorage('proposals', savedProposals);
        
        return this.currentProposal.proposalId;
    }

    // Method to load saved proposals
    loadSavedProposals() {
        return matrixUtils.getFromLocalStorage('proposals') || [];
    }

    // Method to find proposal by ID
    findProposal(proposalId) {
        const savedProposals = this.loadSavedProposals();
        return savedProposals.find(prop => prop.summary.proposalId === proposalId);
    }
}

// Initialize proposal generator
const proposalGenerator = new ProposalGenerator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProposalGenerator, proposalGenerator };
}