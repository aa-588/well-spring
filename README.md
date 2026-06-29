# Wellspring Portal

A full-stack case management and fundraising platform built using **Angular 19**, **Node.js**, **Express**, and **MongoDB**.

The platform enables multiple stakeholders (Admins, Staff, Volunteers, Donors, Seekers, and Partners) to collaborate in managing medical assistance cases, donations, verification, reporting, and partnerships.

---

# Technology Stack

## Frontend
- Angular 19
- Angular Material
- Tailwind CSS
- Standalone Components
- RxJS

## Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# User Roles

The application supports six major user roles.

| Role | Features |
|-------|----------|
| Admin | User Management, Roles, Audit Logs, Configuration |
| Staff | Dashboard, Tasks, Reports, Users |
| Volunteer | Cases, Tasks, Matching, Verification, Profile |
| Donor | Dashboard, Donations, Supported Cases, Matching |
| Seeker | Dashboard, Case Management, Profile |
| Partner | Dashboard, Collaborations, Browse Cases, Profile |

---

# Project Structure

```
well-spring/
│
├── wellspring-portal-ui/
│   ├── src/
│   ├── app/
│   └── angular.json
│
├── wellspring-portal-api/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.ts
│
└── README.md
```

---

# Features

## Admin

- User Management
- Role Management
- Audit Logs
- Configuration

## Staff

- Dashboard
- Task Management
- Reports
- User View

## Volunteer

- Assigned Cases
- Case Details
- Verification Queue
- Matching
- Volunteer Tasks
- Volunteer Profile

## Donor

- Dashboard
- Donations
- Supported Cases
- Suggested Cases
- Profile

## Seeker

- Dashboard
- My Cases
- Profile

## Partner

- Dashboard
- Browse Cases
- Collaborations
- Profile

---

# Authentication

JWT based authentication.

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

Protected APIs use

```
Authorization: Bearer <token>
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<repo>/well-spring.git
```

---

## Backend

```bash
cd wellspring-portal-api

npm install

npm run dev
```

---

## Frontend

```bash
cd wellspring-portal-ui

npm install

ng serve
```

Application

```
http://localhost:4200
```

Backend

```
http://localhost:3000
```

---

# Environment Variables

Backend requires

```
PORT=3000

MONGO_URI=mongodb://localhost:27017/wellspring

JWT_SECRET=xxxxxxxx

JWT_REFRESH_SECRET=xxxxxxxx
```

---

# Seed Data

Populate demo data.

```
npm run seed
```

This creates

- Users
- Staff
- Volunteers
- Donors
- Seekers
- Partners
- Cases
- Tasks
- Reports
- Donations
- Collaborations

---

# API Modules

```
/api/auth

/api/admin/users
/api/admin/roles
/api/admin/audit
/api/admin/config

/api/staff/tasks
/api/staff/reports

/api/volunteer
/api/donor
/api/seeker
/api/partner
```

---

# Folder Highlights

Frontend

```
features/
    admin/
    staff/
    volunteer/
    donor/
    seeker/
    partner/
```

Backend

```
models/
routes/
middleware/
services/
utils/
```

---

# Current Status

## Completed

- Multi-role architecture
- CRUD operations
- Angular standalone components
- Material UI
- JWT Authentication
- Route Guards
- Role Based Access
- MongoDB Integration
- Dashboard Screens
- Sample Seed Data

---

## In Progress

- File Uploads
- Notifications
- Dashboard Analytics
- Charts
- Payment Integration
- AI-based Matching
- Mobile Responsive Improvements

---

# Future Enhancements

- Razorpay Integration
- Email Notifications
- SMS Notifications
- AI Recommendations
- OCR for Medical Documents
- Document Verification
- Report Export (PDF/Excel)
- Audit Dashboard
- Activity Timeline

---

# Contributors

Wellspring Development Team

Built using

- Angular 19
- Express
- MongoDB
- Angular Material
- Tailwind CSS
