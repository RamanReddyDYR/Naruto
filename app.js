// Personal Finance Chatbot Application Logic

class PersonalFinanceChatbot {
    constructor() {
        this.currentScreen = 'welcome';
        this.userProfile = null;
        this.chatHistory = [];
        this.currentChart = null;
        
        // Financial advice database from provided data
        this.financialAdvice = {
            "student": {
                "investing": {
                    "title": "Investment Advice for Students",
                    "content": "Great question! As a student, here's how to start investing with a small budget:\n\n💡 **Start Small & Simple**\n• Begin with just $25-50 per month - consistency matters more than amount\n• Use apps like Acorns or Stash to invest spare change automatically\n• Consider low-cost index funds - they're beginner-friendly and diversified\n\n📚 **Learn the Basics**\n• Stocks represent ownership in companies\n• Bonds are like loans to companies/government\n• Index funds spread risk across many companies\n\n⚠️ **Important Student Tips**\n• Only invest money you don't need for school or living expenses\n• Build a small emergency fund first ($500-1000)\n• Take advantage of student discounts on investment platforms\n\n🎯 **Recommended First Steps**\n1. Open a Roth IRA (tax-free growth!)\n2. Start with a broad market index fund\n3. Automate monthly contributions\n4. Learn as you go - investing is a marathon, not a sprint!\n\nRemember: time is your biggest advantage as a young investor! 🚀"
                },
                "budgeting": {
                    "title": "Budget Tips for Students",
                    "content": "Smart thinking about budgeting as a student! Here's a practical approach:\n\n💰 **The Student 50/30/20 Rule**\n• 50% for needs (tuition, rent, groceries, textbooks)\n• 30% for wants (entertainment, dining out, hobbies)\n• 20% for savings and debt repayment\n\n📱 **Best Budgeting Tools for Students**\n• Mint (free) - tracks expenses automatically\n• YNAB (free with student discount) - zero-based budgeting\n• PocketGuard - prevents overspending\n• Even spreadsheets work great!\n\n🎯 **Student Money-Saving Tips**\n• Buy used textbooks, sell them back each semester\n• Cook at home - can save $200+ monthly vs eating out\n• Use student discounts everywhere (Amazon Prime, Spotify, etc.)\n• Take advantage of free campus activities and resources\n\nSmall habits now = big financial wins later! 🌟"
                },
                "saving": {
                    "title": "Saving Tips for Students",
                    "content": "Awesome that you're thinking about saving as a student! Here are practical tips:\n\n🎯 **Start Small, Think Big**\n• Even $25/month makes a difference over time\n• Use the 'pay yourself first' principle\n• Automate savings so you don't miss the money\n• Aim for a $500 emergency fund first\n\n💡 **Student-Specific Saving Strategies**\n• Save textbook money by using library reserves\n• Pack lunches instead of buying food daily\n• Take advantage of free campus gym and activities\n• Use student discounts for everything\n\n🏦 **Best Savings Tools for Students**\n• High-yield savings accounts (1-2% APY)\n• Automatic transfers from checking\n• Apps like Digit or Qapital for spare change\n• Consider a CD for long-term goals\n\n📈 **Building Good Habits**\n• Track every expense for one month\n• Set specific savings goals (spring break, laptop, etc.)\n• Reward yourself for hitting milestones\n• Remember: small consistent amounts beat large sporadic ones!"
                }
            },
            "professional": {
                "investing": {
                    "title": "Professional Investment Strategy",
                    "content": "Excellent question! As a working professional, you have several sophisticated investment strategies to consider:\n\n🏦 **Maximize Tax-Advantaged Accounts**\n• Contribute to 401(k) up to employer match (free money!)\n• Max out Roth IRA ($6,500 annually for 2024)\n• Consider backdoor Roth conversion if income limits apply\n• Utilize HSA as retirement vehicle (triple tax advantage)\n\n📊 **Diversification Strategy**\n• Asset allocation: Age-appropriate stock/bond mix\n• Geographic diversification: US + international exposure\n• Sector diversification: Technology, healthcare, consumer goods, etc.\n• Alternative investments: REITs, commodities (5-10% allocation)\n\n💰 **Advanced Techniques**\n• Tax-loss harvesting to minimize tax burden\n• Dollar-cost averaging for systematic investing\n• Rebalancing quarterly or when allocations drift >5%\n• Consider low-cost ETFs with expense ratios <0.1%\n\nFocus on consistent contributions and long-term wealth building! 📈"
                },
                "budgeting": {
                    "title": "Professional Budgeting Strategy",
                    "content": "Excellent focus on budgeting! Professional-level budgeting requires strategic thinking:\n\n📊 **Zero-Based Budgeting Approach**\n• Every dollar gets assigned a purpose\n• Income - expenses - savings/investments = $0\n• Prioritize high-impact financial goals\n• Review and adjust monthly based on performance\n\n💼 **Professional Budget Categories**\n• Fixed costs: Mortgage/rent, insurance, loan payments\n• Variable necessities: Groceries, utilities, transportation\n• Professional development: Training, conferences, certifications\n• Strategic savings: Emergency fund, retirement, investments\n\n🎯 **Optimization Strategies**\n• Automate savings and investments (pay yourself first)\n• Negotiate recurring services quarterly\n• Track ROI on professional development expenses\n• Use high-yield accounts for emergency funds\n\n💡 **Professional Tips**\n• Emergency fund: 6-8 months of expenses\n• Max out tax-advantaged accounts before taxable investing\n• Consider fee-only financial planner for complex situations\n• Regular budget reviews aligned with career advancement"
                },
                "saving": {
                    "title": "Advanced Saving Strategies",
                    "content": "Great focus on saving! As a professional, you can implement sophisticated strategies:\n\n🏦 **High-Yield Savings Optimization**\n• Emergency fund in high-yield savings (4-5% APY)\n• Ladder CDs for specific goals with timelines\n• Money market accounts for higher balances\n• Consider treasury bills for short-term parking\n\n💰 **Advanced Savings Techniques**\n• Automate percentage-based increases with raises\n• Use tax refunds strategically for savings goals\n• Implement the 'one-third rule' for windfalls\n• Separate savings for different goal timelines\n\n📈 **Professional Savings Goals**\n• 6-8 months emergency fund\n• House down payment (20% to avoid PMI)\n• Children's education (529 plans)\n• Early retirement/FIRE planning\n\n🎯 **Optimization Strategies**\n• Review and increase savings rate quarterly\n• Use employer ESPP if available (instant returns)\n• Consider mega backdoor Roth for high earners\n• Balance liquidity needs with growth potential"
                }
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserProfile();
        this.showScreen('welcome');
    }

    bindEvents() {
        // Welcome screen events
        document.getElementById('get-started-btn').addEventListener('click', () => {
            this.showScreen('profile');
        });

        // Profile setup events
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectUserType(e));
        });

        document.getElementById('profile-form').addEventListener('submit', (e) => {
            this.handleProfileSubmit(e);
        });

        document.getElementById('profile-form').addEventListener('input', () => {
            this.validateProfileForm();
        });

        // Main app events
        document.getElementById('edit-profile-btn').addEventListener('click', () => {
            this.showScreen('profile');
        });

        document.getElementById('toggle-budget-btn').addEventListener('click', () => {
            this.toggleBudgetSection();
        });

        // Chat events
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickTopic(e.target.dataset.topic);
            });
        });

        // Budget events
        document.getElementById('calculate-budget-btn').addEventListener('click', () => {
            this.analyzeBudget();
        });

        document.querySelectorAll('.expense-input').forEach(input => {
            input.addEventListener('input', () => {
                this.validateBudgetForm();
            });
        });

        document.getElementById('budget-income').addEventListener('input', () => {
            this.validateBudgetForm();
        });
    }

    showScreen(screenName) {
        // Hide all screens
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('profile-screen').classList.add('hidden');
        document.getElementById('main-app').classList.add('hidden');

        // Show requested screen based on screenName
        if (screenName === 'welcome') {
            document.getElementById('welcome-screen').classList.remove('hidden');
        } else if (screenName === 'profile') {
            document.getElementById('profile-screen').classList.remove('hidden');
        } else if (screenName === 'main-app') {
            document.getElementById('main-app').classList.remove('hidden');
            this.updateUserProfileDisplay();
            this.populateBudgetForm();
        }

        this.currentScreen = screenName;
    }

    selectUserType(e) {
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        e.target.closest('.user-type-btn').classList.add('selected');
        this.validateProfileForm();
    }

    validateProfileForm() {
        const selectedType = document.querySelector('.user-type-btn.selected');
        const age = document.getElementById('age').value;
        const income = document.getElementById('income').value;
        const occupation = document.getElementById('occupation').value;

        const isValid = selectedType && age && income && occupation;
        document.getElementById('continue-btn').disabled = !isValid;
    }

    handleProfileSubmit(e) {
        e.preventDefault();
        
        const selectedType = document.querySelector('.user-type-btn.selected').dataset.type;
        
        this.userProfile = {
            userType: selectedType,
            age: parseInt(document.getElementById('age').value),
            income: parseInt(document.getElementById('income').value),
            occupation: document.getElementById('occupation').value,
            timestamp: Date.now()
        };

        this.saveUserProfile();
        this.showScreen('main-app');
    }

    updateUserProfileDisplay() {
        if (this.userProfile) {
            const profileText = `${this.userProfile.userType === 'student' ? '🎓' : '💼'} ${this.userProfile.occupation} • $${this.userProfile.income.toLocaleString()}/month`;
            document.getElementById('user-profile-text').textContent = profileText;
        }
    }

    populateBudgetForm() {
        if (this.userProfile) {
            document.getElementById('budget-income').value = this.userProfile.income;
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateBotResponse(message);
        }, 1500);
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'message user-message';
        messageEl.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        this.chatHistory.push({ type: 'user', message, timestamp: Date.now() });
    }

    addBotMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message';
        
        // Handle formatted content
        const formattedMessage = this.formatBotMessage(message);
        messageEl.innerHTML = `
            <div class="message-content">
                ${formattedMessage}
            </div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        this.chatHistory.push({ type: 'bot', message, timestamp: Date.now() });
    }

    formatBotMessage(content) {
        // Convert markdown-style formatting to HTML
        let formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n•/g, '<br>•')
            .replace(/\n(\d+\.)/g, '<br>$1');
        
        return `<p>${formatted}</p>`;
    }

    generateBotResponse(userMessage) {
        const userType = this.userProfile?.userType || 'student';
        let response = '';

        // Check for specific topic keywords
        const message = userMessage.toLowerCase();
        
        if (message.includes('invest') || message.includes('investment') || message.includes('stock') || message.includes('portfolio')) {
            response = this.financialAdvice[userType]['investing'].content;
        } else if (message.includes('budget') || message.includes('expense') || message.includes('spend')) {
            response = this.financialAdvice[userType]['budgeting'].content;
        } else if (message.includes('save') || message.includes('saving') || message.includes('emergency fund')) {
            response = this.financialAdvice[userType]['saving'].content;
        } else {
            // General response based on user type
            response = this.getGeneralResponse(userMessage, userType);
        }

        this.addBotMessage(response);
    }

    getGeneralResponse(message, userType) {
        const generalResponses = {
            student: [
                "Great question! As a student, I'd recommend focusing on building good financial habits early. What specific area would you like help with - saving, budgeting, or maybe learning about investing?",
                "I'm here to help with your finances! Since you're a student, I can provide advice on managing money on a tight budget, building your first emergency fund, or starting to invest with small amounts.",
                "That's a thoughtful financial question! For students like you, I always recommend starting with the basics: track your spending, build a small emergency fund, and then explore investment options that work with your budget."
            ],
            professional: [
                "Excellent question! As a working professional, you have great opportunities to optimize your financial strategy. I can help with advanced budgeting, investment diversification, tax-advantaged accounts, and wealth building strategies.",
                "I appreciate your focus on financial planning! Given your professional status, we should discuss maximizing your tax-advantaged accounts, creating sophisticated investment portfolios, and building long-term wealth strategies.",
                "That's a strategic question! For professionals, I recommend focusing on optimizing your entire financial ecosystem - from emergency funds to retirement planning to tax-efficient investing."
            ]
        };

        const responses = generalResponses[userType];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickTopic(topic) {
        const userType = this.userProfile?.userType || 'student';
        const advice = this.financialAdvice[userType][topic];
        
        if (advice) {
            this.addUserMessage(`Tell me about ${topic}`);
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(advice.content);
            }, 1000);
        }
    }

    showTypingIndicator() {
        document.getElementById('typing-indicator').classList.remove('hidden');
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').classList.add('hidden');
    }

    toggleBudgetSection() {
        const chatSection = document.getElementById('chat-section');
        const budgetSection = document.getElementById('budget-section');
        const toggleBtn = document.getElementById('toggle-budget-btn');
        const toggleText = document.getElementById('toggle-text');
        const appLayout = document.querySelector('.app-layout');

        if (budgetSection.classList.contains('hidden')) {
            // Show budget section
            budgetSection.classList.remove('hidden');
            chatSection.classList.add('hidden');
            toggleText.textContent = 'Back to Chat';
            appLayout.classList.remove('split');
        } else {
            // Show chat section
            budgetSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
            toggleText.textContent = 'Budget Calculator';
            appLayout.classList.remove('split');
        }
    }

    validateBudgetForm() {
        const income = parseFloat(document.getElementById('budget-income').value) || 0;
        const expenseInputs = document.querySelectorAll('.expense-input');
        let hasExpenses = false;

        expenseInputs.forEach(input => {
            if (parseFloat(input.value) > 0) {
                hasExpenses = true;
            }
        });

        const isValid = income > 0 && hasExpenses;
        document.getElementById('calculate-budget-btn').disabled = !isValid;
    }

    analyzeBudget() {
        const income = parseFloat(document.getElementById('budget-income').value) || 0;
        const expenses = {};
        let totalExpenses = 0;

        document.querySelectorAll('.expense-input').forEach(input => {
            const category = input.dataset.category;
            const amount = parseFloat(input.value) || 0;
            expenses[category] = amount;
            totalExpenses += amount;
        });

        const netSavings = income - totalExpenses;
        const savingsRate = income > 0 ? (netSavings / income) * 100 : 0;

        this.updateBudgetSummary(income, totalExpenses, netSavings, savingsRate);
        this.createBudgetChart(expenses);
        this.generateBudgetInsights(income, totalExpenses, netSavings, savingsRate, expenses);

        document.getElementById('budget-analysis').classList.remove('hidden');
    }

    updateBudgetSummary(income, expenses, savings, rate) {
        document.getElementById('total-income').textContent = `$${income.toLocaleString()}`;
        document.getElementById('total-expenses').textContent = `$${expenses.toLocaleString()}`;
        
        const savingsEl = document.getElementById('net-savings');
        savingsEl.textContent = `$${savings.toLocaleString()}`;
        savingsEl.className = `summary-value ${savings >= 0 ? 'positive' : 'negative'}`;
        
        const rateEl = document.getElementById('savings-rate');
        rateEl.textContent = `${rate.toFixed(1)}%`;
        rateEl.className = `summary-value ${rate >= 20 ? 'positive' : rate >= 10 ? '' : 'negative'}`;
    }

    createBudgetChart(expenses) {
        const ctx = document.getElementById('budget-chart').getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }

        const labels = Object.keys(expenses).filter(key => expenses[key] > 0);
        const data = labels.map(key => expenses[key]);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];

        this.currentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    generateBudgetInsights(income, expenses, savings, rate, expenseBreakdown) {
        const userType = this.userProfile?.userType || 'student';
        let insights = [];

        // Savings rate analysis
        if (rate >= 20) {
            insights.push(`🎉 Excellent savings rate of ${rate.toFixed(1)}%! You're on track for strong financial health.`);
        } else if (rate >= 10) {
            insights.push(`👍 Good savings rate of ${rate.toFixed(1)}%. Consider aiming for 20% if possible.`);
        } else if (rate > 0) {
            insights.push(`⚠️ Your savings rate of ${rate.toFixed(1)}% could be improved. Try to aim for at least 10-20%.`);
        } else {
            insights.push(`🚨 You're spending more than you earn. Let's work on reducing expenses or increasing income.`);
        }

        // Category-specific insights
        const housingPercent = (expenseBreakdown.Housing / income) * 100;
        if (housingPercent > 30) {
            insights.push(`🏠 Your housing costs (${housingPercent.toFixed(1)}% of income) are high. The recommended maximum is 30%.`);
        }

        // User type specific advice
        if (userType === 'student') {
            insights.push(`🎓 Student tip: Look for ways to reduce textbook and food costs. Consider cooking at home more often and using library resources.`);
            if (savings > 0) {
                insights.push(`💡 Great job saving as a student! Consider opening a high-yield savings account for your emergency fund.`);
            }
        } else {
            insights.push(`💼 Professional recommendation: Maximize your 401(k) match and consider increasing retirement contributions.`);
            if (rate < 15) {
                insights.push(`📈 As a professional, aim to save at least 15-20% for retirement and other long-term goals.`);
            }
        }

        // Actionable recommendations
        const highestExpense = Object.entries(expenseBreakdown).reduce((a, b) => 
            expenseBreakdown[a[0]] > expenseBreakdown[b[0]] ? a : b
        );
        
        if (highestExpense[1] > 0) {
            insights.push(`🎯 Your largest expense is ${highestExpense[0]} ($${highestExpense[1].toLocaleString()}). This might be a good area to optimize.`);
        }

        document.getElementById('budget-insights').innerHTML = insights.map(insight => 
            `<p>${insight}</p>`
        ).join('');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    saveUserProfile() {
        if (this.userProfile) {
            localStorage.setItem('financeBot_userProfile', JSON.stringify(this.userProfile));
        }
    }

    loadUserProfile() {
        const saved = localStorage.getItem('financeBot_userProfile');
        if (saved) {
            this.userProfile = JSON.parse(saved);
            // Check if profile is recent (within 24 hours)
            if (Date.now() - this.userProfile.timestamp < 24 * 60 * 60 * 1000) {
                this.showScreen('main-app');
            } else {
                localStorage.removeItem('financeBot_userProfile');
                this.userProfile = null;
            }
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PersonalFinanceChatbot();
});