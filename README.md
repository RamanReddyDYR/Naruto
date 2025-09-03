# Personal Finance Chatbot

An intelligent conversational AI system leveraging IBM Watson and Granite AI models to provide personalized financial guidance with demographic-aware communication.

## 🚀 Features

- **Personalized Financial Guidance**: Customized advice on savings, taxes, and investments
- **AI-Generated Budget Summaries**: Automated, easy-to-understand budget analysis
- **Spending Insights**: Actionable recommendations to optimize expenses
- **Demographic-Aware Communication**: Adapts tone and complexity for students vs. professionals
- **Conversational NLP**: Natural, context-aware interactions powered by IBM Watson and Granite

## 🛠️ Technologies

- **Python**: Core programming language
- **Streamlit**: Interactive web application framework
- **IBM Watson**: AI services and natural language processing
- **IBM Granite**: Enterprise-grade large language models
- **HuggingFace**: Model integration and hosting

## 📁 Project Structure

```
personal-finance-chatbot/
├── app/
│   ├── main.py              # Main Streamlit application
│   ├── config.py            # Configuration management
│   └── utils/
│       ├── watson_client.py # IBM Watson integration
│       ├── granite_model.py # Granite model interface
│       └── demographic_adapter.py # User type adaptation
├── data/
│   ├── financial_templates/ # Budget and advice templates
│   └── user_profiles/       # Sample user profiles
├── tests/
├── deployment/
│   ├── Dockerfile
│   └── docker-compose.yml
├── requirements.txt
└── README.md
```

## 🔧 Installation & Setup

### 1. Clone and Setup
```bash
git clone <repository-url>
cd personal-finance-chatbot
python setup.py
```

### 2. Configure IBM Watson Services

Create a `.env` file with your IBM Watson credentials:

```env
WATSON_APIKEY=your_watson_api_key_here
WATSON_URL=https://api.us-south.assistant.watson.cloud.ibm.com
WATSON_ASSISTANT_ID=your_assistant_id_here
WATSONX_APIKEY=your_watsonx_api_key_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_PROJECT_ID=your_project_id_here
GRANITE_MODEL_ID=ibm/granite-13b-chat-v2
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
streamlit run main_app.py
```

Visit `http://localhost:8501` in your browser.

## 💡 Key Innovations

### Demographic-Aware Responses
The chatbot intelligently adapts its communication style:

- **Student Mode**: 
  - Simplified language and concepts
  - Budget-conscious advice
  - Focus on building financial habits
  - Encouraging, supportive tone

- **Professional Mode**:
  - Advanced financial terminology
  - Investment strategies and tax optimization
  - Comprehensive wealth-building guidance
  - Professional, sophisticated tone

### AI-Powered Budget Analysis
- Automated expense categorization
- Spending pattern recognition
- Personalized improvement recommendations
- Risk assessment and warnings

## 🔐 Configuration

### IBM Watson Setup
1. Create an IBM Cloud account
2. Set up Watson Assistant and Watsonx.ai services
3. Obtain API keys and service URLs
4. Configure your assistant with financial knowledge base

### HuggingFace Integration
```python
# Access Granite models via HuggingFace
from transformers import AutoTokenizer, AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("ibm-granite/granite-13b-chat-v2")
tokenizer = AutoTokenizer.from_pretrained("ibm-granite/granite-13b-chat-v2")
```

## 🧪 Testing

Run the test suite:
```bash
python -m pytest tests/
```

## 🚢 Deployment

### Docker Deployment
```bash
cd deployment
docker-compose up -d
```

### Cloud Deployment
The application is ready for deployment on:
- IBM Cloud
- AWS
- Google Cloud Platform
- Azure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Usage Examples

### Basic Chat
```
User: "How should I start investing as a student?"
Bot: "Great question! As a student, I recommend starting with these beginner-friendly steps..."
```

### Budget Analysis
```python
# Generate budget summary
expenses = {
    "Housing": 1000,
    "Food": 400,
    "Transportation": 300,
    "Entertainment": 200
}
summary = advisor.generate_budget_summary(income=3000, expenses=expenses, user_type="student")
```

## 🌟 Social Impact

This project aims to:
- Democratize access to financial advice
- Improve financial literacy across demographics
- Reduce barriers to financial education
- Empower informed financial decision-making

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 References

- [IBM Watson Documentation](https://cloud.ibm.com/docs/assistant)
- [IBM Granite Models](https://huggingface.co/ibm-granite)
- [Streamlit Documentation](https://docs.streamlit.io)

## 👥 Team

- **Project Lead**: [Your Name]
- **AI/ML Engineer**: [Team Member]
- **Financial Advisor**: [Domain Expert]

---

**Built with ❤️ using IBM Watson, Granite AI, and Streamlit**