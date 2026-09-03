# Hireboard - Job Portal Management System

A full stack Job Portal Management System with seperate Admin and User portals.

## Tech Stack
*Frontend:* React.js (Vite) , Redux Toolkit , React Router , Tailwind CSS ,Axios , Lucide Icons
*Backend:* Node.js, Express.js , Sequelize ORM , JWT (access & refresh tokens) , bcrypt
*Database:* PostgreSQL

## Features

*Admin Portal*
- Secure login with JWT access + refresh tokens
- Dashboard with live status (total,active & closed jobs), filters, search, and date range.
- Job management: create, edit, delete, list with category ,experience,search filters and pagination.
- All CRUD operations managed through Redux Toolkit

*User Portal*
- Landing page with featured jobs and category browsing
- Public job listing with filters and pagination
- Job details page with Apply functionality
- Duplicate application prevention (shows "Already Applied" alert)
- Application history page ("My Applications")
- User registration and login


## Project Structure

hireboard/

├── backend/
│ └── src/
│ ├── config/                             # Database configuration
│ ├── constants/                          # Roles, categories, experience levels, statuses
│ ├── controllers/                        # Request/response handlers
│ ├── middleware/                         # Auth & role-based authorization
│ ├── models/                             # Sequelize models (User, Job, Application, RefreshToken)
│ ├── routes/                             # API route definitions
│ ├── seeders/                            # Database seed script
│ └── services/                           # Business logic layer

├── frontend/
│ └── src/
│ ├── components/                          # Reusable UI components
│ ├── constant/                            # API endpoints, route paths, job constants
│ ├── layouts/                             # AdminLayout, FixedLayout (public)
│ ├── pages/
│ │ ├── admin/                             # Login, Dashboard, JobListing, JobForm
│ │ └── public/                            # Landing, JobListing, JobDetails, Login, Register, MyApplications
│ ├── routes/                              # AppRoutes, ProtectedRoute
│ ├── services/                            # Axios API call wrappers
│ ├── store/                               # Redux Toolkit slices (auth, jobs, applications)
│ └── utils/                               # Axios instance configuration




## Setup Instructions

1. *Clone the repository*
```bash
git clone https://github.com/athuliyaps/hireboard_.git
cd hireboard_
```

2. *Backend setup*
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`

PORT=5000
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_
DB_NAME=hireboard_db
DB_HOST=localhost
JWT_ACCESS_SECRET=your_access_secret_
JWT_REFRESH_SECRET=your_refresh_secret_
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

**Run the backend (this auto-syncs the database schema)
 ```bash
    npm run dev
 ```

**Seed the database within an admin , a test user, and 14 sample jobs:
 ```bash
    npm run seed
 ```


3. *Frontend setup*
```bash
cd frontend
npm install
```

Create `.env` fie in `frontend/` 
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

4. *Access the application*

- *User Portal* -  http://localhost:5173/
- *Admin Portal* - http://localhost:5173/admin/login



## Seeded Credentials

| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | admin@gmail.com      | admin123  |
| User  | user@gmail.com       | user123   |


## API Overview

| Method     | Endpoint                  | Description                           | Auth Required      |
|-------     |------------------------   |-------------------------------------  |--------------------|
| POST       | /api/auth/register        | Register a new user                   | No                 |
| POST       | /api/auth/login           | Login (admin or user)                 | No                 |
| POST       | /api/auth/refresh         | Refresh access token                  | No (refresh token) |
| GET        | /api/job                  | List/filter/paginate jobs             | No                 |
| GET        | /api/job?id=:id           | Get single job                        | No                 |
| GET        | /api/job/count            | Job Dashbaord counts                  | No                 |
| POST       | /api/job                  | Create job                            | Yes (admin)        |
| PUT        | /api/job/:id              | Update job                            | Yes (admin)        |
| DELETE     | /api/job/:id              | Delete job                            | Yes (admin)        |
| POST       | /api/applications         | Apply to a job                        | Yes (user)         |
| GET        | /api/applications         | Get logged-in user's applications     | Yes (user)         |



## Known applications

- Access tokens expire after 15 minutes; automatic silent refresh on the frontend is not yet implemented, so users may need to log in again after extended inactivity. The refresh endpoint itself is fully functional and tested
- Database schema is managed via Sequelize's `sync({ alter: true })` for development speed rather than versioned migration files


## Database migrations

- Migration files are located in `backend/src/migrations/`.To run them on a fresh database:
``` bash
cd backend
npx sequelize-cli db:migrate
```

- Note : The application also auto-syncs schema via `sequelize.sync({ alter: true })` on startup for development convenience.





