# Udyam Registration Form Clone

This project is a full-stack web application that mimics the first two steps of the official Udyam Registration process in India. It is built with a modern technology stack and includes a responsive frontend, a robust backend API, a PostgreSQL database, and a full suite of unit tests. The entire application is also containerized with Docker.

This project was developed to fulfill the requirements of the Openbiz Full-Stack Developer assignment.

## Folder Structure

Udyam/
├── backend/
│   ├── app/
│   │   ├── init.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── database.py
│   ├── tests/
│   │   └── test_main.py
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── forms/
│   │   │   └── RegistrationForm.tsx
│   │   └── ui/
│   │       ├── Input.tsx
│   │       └── ProgressTracker.tsx
│   ├── lib/
│   │   └── api.ts
│   └── tests/
│       └── RegistrationForm.test.tsx
├── .dockerignore
├── .gitignore
├── Dockerfile
├── jest.config.mjs
├── jest.setup.js
├── next.config.mjs
├── package.json
└── tsconfig.json

## Features

- **Responsive Multi-Step UI:** A clean, mobile-first two-step registration form.
- **Real-time Validation:** Instant client-side validation for fields like Aadhaar and PAN.
- **Visual Progress Tracker:** A UI component that shows the user's progress through the form steps.
- **RESTful Backend API:** A robust backend built with FastAPI to handle form submissions.
- **Server-Side Validation:** Strong data validation on the backend using Pydantic.
- **Database Integration:** Form submissions are securely stored in a PostgreSQL database.
- **Comprehensive Unit Testing:** Both frontend and backend include a suite of unit tests to ensure reliability.
- **Containerized Application:** The entire stack is containerized with Docker for easy deployment and scalability.

## Tech Stack

**Frontend:**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Jest & React Testing Library

**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Pytest

**DevOps:**
- Docker

## Local Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- Python (v3.11 or later)
- PostgreSQL
- Docker Desktop

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Udyam

## 2. Backend Setup

### a. Navigate to the backend directory:
```bash
cd backend
```

### b. Create and activate a virtual environment:

**For macOS/Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

**For Windows**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

### c. Install dependencies:
```bash
pip install -r requirements.txt
```

### d. Set up PostgreSQL:
- Create a new database in PostgreSQL (e.g., `udyam_db`).
- Note your database **username**, **password**, **host**, and **database name**.

### e. Configure Environment Variables:
- Create a file named `.env` in the `backend` directory.
- Add your database connection string to it:
```env
DATABASE_URL="postgresql://postgres:Gulfam%402003@localhost:5432/mydatabase"
```
> **Note:** We will also need to update `backend/app/database.py` to read this variable.

### f. Run the backend server:
```bash
uvicorn app.main:app --reload
```
The backend API will be running at:  
**http://127.0.0.1:8000**

---

## 3. Frontend Setup

### a. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

### b. Install dependencies:
```bash
npm install
```

### c. Run the frontend development server:
```bash
npm run dev
```
The frontend application will be running at:  
**http://localhost:3000**

---

## Running with Docker

> This allows we to run the application without installing Node.js or Python directly on your machine.  
> You still need **Docker Desktop** and a **running PostgreSQL database**.

### 1. Run the Backend Container:
```bash
# Navigate to the backend directory
cd backend

# Build the image
docker build -t udyam-backend .

# Note: To run this container, it must be able to connect to our PostgreSQL database.
# This requires advanced Docker networking (e.g., Docker Compose).
```

### 2. Run the Frontend Container:
```bash
# Navigate to the frontend directory
cd frontend

# Build the image
docker build -t udyam-frontend .

# Run the container
docker run -d --name udyam-frontend-container -p 3001:3000 udyam-frontend
```
The frontend will be accessible at:  
**http://localhost:3001**

---

## Running Tests

### 1. Backend Tests:
```bash
# Navigate to the backend directory
cd backend

# Make sure your virtual environment is active
# ...

# Run pytest
python -m pytest
```

### 2. Frontend Tests:
```bash
# Navigate to the frontend directory
cd frontend

# Run Jest
npm test
```
