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

## Setup Instructions

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