# 🧠 AI Chatbot (Django + React + OpenAI)

A full-stack chatbot app using Django REST API, React.js frontend, and OpenAI GPT-4.

---

## 🚀 Features

- React.js frontend UI
- Django backend API with OpenAI integration
- Typing indicator
- Simple chat history (frontend only)

---

## 🛠️ Setup Instructions

### 1. Backend (Django)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Fill in your OpenAI API key in .env
python manage.py runserver
