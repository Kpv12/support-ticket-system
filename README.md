# Support Ticket System

A full-stack support ticket management system built with Django REST Framework.

## Features

- Create, update, delete support tickets
- Search and filter tickets
- Ticket analytics and statistics
- Automatic ticket classification
- RESTful API design
- Docker-ready setup

## Tech Stack

- Backend: Django, Django REST Framework
- Database: SQLite (Dev)
- Containerization: Docker
- API Style: REST

# Setup Instructions

1. Create .env file based on .env.example

2. Run:
   docker compose up --build

3. Access:
   Frontend: http://localhost:4173
   Backend: http://localhost:8000

# LLM Choice

I used Hugging Face Inference API with a lightweight text-classification model
for ticket categorization.

Reason:
- Simple integration with REST
- Fast inference
- No need for heavy GPU hosting
- Cost-effective for small-scale deployment


# Design Decisions

- Django REST Framework for backend API
- React + Vite for lightweight frontend
- Dockerized for reproducibility
- Rule-based fallback classifier if LLM fails
- Environment variables for secure config
### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Server runs at:

http://127.0.0.1:8000

API Endpoints
Endpoint	Method	Description
/api/tickets/	CRUD	Ticket Management
/api/tickets/stats/	GET	Analytics
/api/tickets/classify/	POST	Auto Classification
Classification Logic
Ticket classification is implemented using a rule-based NLP system that analyzes keywords in ticket descriptions. This architecture allows future replacement with AI/LLM-based models.

Author
Varun KP