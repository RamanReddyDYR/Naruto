
import streamlit as st
import json
import time
from datetime import datetime
import pandas as pd
from typing import Dict, List, Any
import os

# Import our custom modules (would be separate files in actual project)
class DemographicAdapter:
    """Adapts chatbot responses based on user demographics"""

    def __init__(self):
        self.student_keywords = ["simple", "basic", "affordable", "budget-friendly", "starter"]
        self.professional_keywords = ["investment", "portfolio", "tax optimization", "advanced", "strategies"]

    def classify_user(self, user_input: str, user_profile: Dict) -> str:
        """Classify user as student or professional based on input and profile"""
        if user_profile.get("occupation") == "student":
            return "student"
        elif user_profile.get("occupation") == "professional":
            return "professional"

        # Fallback to input analysis
        student_score = sum(1 for word in self.student_keywords if word in user_input.lower())
        professional_score = sum(1 for word in self.professional_keywords if word in user_input.lower())

        return "student" if student_score > professional_score else "professional"

    def adapt_response(self, response: str, user_type: str) -> str:
        """Adapt response tone and complexity based on user type"""
        if user_type == "student":
            # Simplify language and add encouraging tone
            adaptations = {
                "investment": "saving money",
                "portfolio": "collection of investments",
                "diversification": "not putting all eggs in one basket",
                "asset allocation": "how you split your money"
            }
            for complex_term, simple_term in adaptations.items():
                response = response.replace(complex_term, simple_term)

            # Add encouraging prefix for students
            if not response.startswith("Great question"):
                response = "Great question! " + response

        return response

class FinancialAdvisor:
    """Core financial advisory logic"""

    def __init__(self):
        self.financial_tips = {
            "savings": {
                "student": [
                    "Start with the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
                    "Open a high-yield savings account for better returns",
                    "Automate your savings - even $25/month makes a difference",
                    "Use student discounts and free resources whenever possible"
                ],
                "professional": [
                    "Maximize your 401(k) employer match - it's free money",
                    "Consider a Roth IRA for tax-free retirement growth",
                    "Build an emergency fund covering 6 months of expenses",
                    "Diversify savings across multiple accounts and investment vehicles"
                ]
            },
            "budgeting": {
                "student": [
                    "Track expenses using free apps like Mint or YNAB student discount",
                    "Cook at home more often - it can save $200+ per month",
                    "Buy used textbooks and sell them back each semester",
                    "Take advantage of free campus activities for entertainment"
                ],
                "professional": [
                    "Use zero-based budgeting to optimize every dollar",
                    "Review and negotiate recurring subscriptions quarterly",
                    "Implement envelope budgeting for variable expenses",
                    "Consider hiring a financial advisor for complex situations"
                ]
            },
            "investing": {
                "student": [
                    "Start with low-cost index funds - they're beginner-friendly",
                    "Use apps like Acorns to invest spare change automatically",
                    "Learn the basics: stocks represent company ownership",
                    "Don't invest money you need for school or living expenses"
                ],
                "professional": [
                    "Diversify across asset classes: stocks, bonds, REITs, commodities",
                    "Consider tax-loss harvesting to minimize tax burden",
                    "Rebalance your portfolio annually or when allocations drift",
                    "Evaluate expense ratios and choose low-cost funds"
                ]
            }
        }

    def get_advice(self, topic: str, user_type: str) -> str:
        """Get financial advice based on topic and user type"""
        if topic.lower() in self.financial_tips:
            tips = self.financial_tips[topic.lower()][user_type]
            return "\n\n".join([f"• {tip}" for tip in tips])
        return "I'd be happy to help with that! Could you be more specific about what financial topic you'd like advice on?"

    def generate_budget_summary(self, income: float, expenses: Dict[str, float], user_type: str) -> str:
        """Generate AI-powered budget summary"""
        total_expenses = sum(expenses.values())
        remaining = income - total_expenses
        savings_rate = (remaining / income) * 100 if income > 0 else 0

        # Create summary based on user type
        if user_type == "student":
            summary = f"""
📊 **Your Monthly Budget Summary**

💰 **Income**: ${income:,.2f}
💸 **Total Expenses**: ${total_expenses:,.2f}
💵 **Money Left**: ${remaining:,.2f}
📈 **Savings Rate**: {savings_rate:.1f}%

**Expense Breakdown:**
"""
        else:
            summary = f"""
📊 **Professional Budget Analysis**

💰 **Monthly Income**: ${income:,.2f}
💸 **Total Expenditures**: ${total_expenses:,.2f}
💵 **Net Cash Flow**: ${remaining:,.2f}
📈 **Savings Rate**: {savings_rate:.1f}%

**Detailed Expense Analysis:**
"""

        for category, amount in expenses.items():
            percentage = (amount / income) * 100 if income > 0 else 0
            summary += f"\n• {category}: ${amount:,.2f} ({percentage:.1f}% of income)"

        # Add insights
        summary += "\n\n**💡 AI Insights:**\n"
        if savings_rate < 20:
            if user_type == "student":
                summary += "• Try to save at least 20% of your income. Look for areas to cut back!"
            else:
                summary += "• Consider optimizing your expense allocation to achieve a 20%+ savings rate."

        if remaining < 0:
            summary += "• ⚠️ You're spending more than you earn. Time to review your expenses!"

        return summary

class WatsonClient:
    """Simulated IBM Watson client for demo purposes"""

    def __init__(self):
        self.model_responses = {
            "greeting": "Hello! I'm your personal finance chatbot powered by IBM Watson and Granite AI. I'm here to help you with budgeting, saving, investing, and financial planning. What would you like to know?",
            "default": "I understand you're looking for financial guidance. Let me help you with that based on your profile."
        }

    def generate_response(self, prompt: str, user_context: Dict) -> str:
        """Simulate Watson AI response generation"""
        # In a real implementation, this would call IBM Watson APIs
        time.sleep(0.5)  # Simulate API call delay

        if "hello" in prompt.lower() or "hi" in prompt.lower():
            return self.model_responses["greeting"]

        return self.model_responses["default"]

# Streamlit App Configuration
st.set_page_config(
    page_title="Personal Finance Chatbot",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
if 'messages' not in st.session_state:
    st.session_state.messages = []
if 'user_profile' not in st.session_state:
    st.session_state.user_profile = {}
if 'chatbot_initialized' not in st.session_state:
    st.session_state.chatbot_initialized = False

# Initialize components
@st.cache_resource
def initialize_chatbot():
    return {
        'demographic_adapter': DemographicAdapter(),
        'financial_advisor': FinancialAdvisor(),
        'watson_client': WatsonClient()
    }

def main():
    # Title and Header
    st.title("🤖 Personal Finance Chatbot")
    st.markdown("*Powered by IBM Watson & Granite AI*")

    # Sidebar for user profile
    with st.sidebar:
        st.header("👤 User Profile")

        occupation = st.selectbox(
            "What's your occupation?",
            ["student", "professional", "other"],
            key="occupation"
        )

        age = st.number_input("Age", min_value=16, max_value=100, value=25)

        income = st.number_input(
            "Monthly Income ($)", 
            min_value=0.0, 
            value=3000.0, 
            step=100.0
        )

        st.session_state.user_profile = {
            "occupation": occupation,
            "age": age,
            "income": income
        }

        # Budget Calculator Section
        st.header("💰 Quick Budget Tool")

        with st.expander("Enter Your Monthly Expenses"):
            housing = st.number_input("Housing/Rent", min_value=0.0, value=1000.0)
            food = st.number_input("Food & Groceries", min_value=0.0, value=400.0)
            transport = st.number_input("Transportation", min_value=0.0, value=300.0)
            entertainment = st.number_input("Entertainment", min_value=0.0, value=200.0)
            utilities = st.number_input("Utilities", min_value=0.0, value=150.0)
            other = st.number_input("Other Expenses", min_value=0.0, value=200.0)

            expenses = {
                "Housing": housing,
                "Food": food,
                "Transportation": transport,
                "Entertainment": entertainment,
                "Utilities": utilities,
                "Other": other
            }

            if st.button("Generate Budget Summary"):
                components = initialize_chatbot()
                user_type = components['demographic_adapter'].classify_user("", st.session_state.user_profile)
                summary = components['financial_advisor'].generate_budget_summary(
                    income, expenses, user_type
                )
                st.markdown(summary)

    # Main chat interface
    st.header("💬 Chat with Your Financial Advisor")

    # Initialize chatbot components
    if not st.session_state.chatbot_initialized:
        st.session_state.components = initialize_chatbot()
        st.session_state.chatbot_initialized = True

        # Add welcome message
        welcome_msg = "Hello! I'm your AI-powered personal finance advisor. I can help you with budgeting, saving, investing, and financial planning. I'll adapt my advice based on whether you're a student or working professional. What would you like to know?"
        st.session_state.messages.append({"role": "assistant", "content": welcome_msg})

    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.write(message["content"])

    # Chat input
    if prompt := st.chat_input("Ask me anything about personal finance..."):
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})

        with st.chat_message("user"):
            st.write(prompt)

        # Generate response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                components = st.session_state.components

                # Classify user type
                user_type = components['demographic_adapter'].classify_user(
                    prompt, st.session_state.user_profile
                )

                # Determine response type
                if any(word in prompt.lower() for word in ["budget", "save", "saving"]):
                    response = components['financial_advisor'].get_advice("savings", user_type)
                elif any(word in prompt.lower() for word in ["invest", "investment", "stock"]):
                    response = components['financial_advisor'].get_advice("investing", user_type)
                elif any(word in prompt.lower() for word in ["budget", "spend", "expense"]):
                    response = components['financial_advisor'].get_advice("budgeting", user_type)
                else:
                    # Use Watson for general queries
                    response = components['watson_client'].generate_response(prompt, st.session_state.user_profile)

                # Adapt response for user type
                adapted_response = components['demographic_adapter'].adapt_response(response, user_type)

                st.write(adapted_response)

                # Add assistant message to chat history
                st.session_state.messages.append({"role": "assistant", "content": adapted_response})

    # Footer with quick action buttons
    st.markdown("---")
    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("💡 Get Saving Tips"):
            user_type = st.session_state.components['demographic_adapter'].classify_user("", st.session_state.user_profile)
            tips = st.session_state.components['financial_advisor'].get_advice("savings", user_type)
            st.session_state.messages.append({"role": "assistant", "content": tips})
            st.rerun()

    with col2:
        if st.button("📈 Investment Advice"):
            user_type = st.session_state.components['demographic_adapter'].classify_user("", st.session_state.user_profile)
            advice = st.session_state.components['financial_advisor'].get_advice("investing", user_type)
            st.session_state.messages.append({"role": "assistant", "content": advice})
            st.rerun()

    with col3:
        if st.button("🧮 Budget Help"):
            user_type = st.session_state.components['demographic_adapter'].classify_user("", st.session_state.user_profile)
            help_text = st.session_state.components['financial_advisor'].get_advice("budgeting", user_type)
            st.session_state.messages.append({"role": "assistant", "content": help_text})
            st.rerun()

if __name__ == "__main__":
    main()
