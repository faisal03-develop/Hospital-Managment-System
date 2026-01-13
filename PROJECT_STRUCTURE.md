# Hospital Management System - Project Structure & Naming Conventions

## 📁 Project Overview
This document outlines the folder structure and naming conventions used in the Hospital Management System built with MERN stack.

## 🏗️ Root Structure
```
hospital/
├── backend/           # Node.js/Express server
├── frontend/          # React.js client
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## 🔧 Backend Structure
```
backend/
├── config/
│   └── config.env                    # Environment variables
├── controller/
│   ├── appointment.Controller.js     # Appointment business logic
│   ├── message.Controller.js         # Message handling logic
│   ├── report.Controller.js          # Medical report logic
│   ├── upload.Controller.js          # File upload logic
│   └── user.Controller.js            # User management logic
├── db/
│   └── dbConnection.js               # MongoDB connection
├── middleware/
│   ├── auth.js                       # Authentication middleware
│   ├── catchAsyncError.js            # Error handling wrapper
│   └── errorMiddleware.js            # Global error handler
├── models/
│   ├── applointment.Model.js         # Appointment schema
│   ├── messege.Model.js              # Message schema
│   ├── report.Model.js               # Medical report schema
│   └── user.Model.js                 # User schema
├── routes/
│   ├── appointment.Route.js          # Appointment endpoints
│   ├── message.Route.js              # Message endpoints
│   ├── report.Route.js               # Report endpoints
│   └── user.Route.js                 # User endpoints
├── utils/
│   ├── jwtToken.js                   # JWT token utilities
│   └── upload.js                     # File upload utilities
├── app.js                            # Express app configuration
├── package.json                      # Dependencies & scripts
└── server.js                         # Server entry point
```

## ⚛️ Frontend Structure
```
frontend/
├── public/
│   ├── departments/                  # Department images
│   │   ├── cardio.jpg
│   │   ├── derma.jpg
│   │   ├── ent.jpg
│   │   ├── neuro.jpg
│   │   ├── onco.jpg
│   │   ├── ortho.jpg
│   │   ├── pedia.jpg
│   │   ├── radio.jpg
│   │   └── therapy.jpg
│   ├── about.png                     # Static images
│   ├── contact.png
│   ├── hero.png
│   ├── logo.png
│   └── services.png
├── src/
│   ├── assets/                       # Static assets
│   │   └── react.svg
│   ├── components/                   # Reusable components
│   │   ├── AdminProtectedRoute.jsx   # Admin route protection
│   │   ├── AppointmentForm.jsx       # Appointment booking form
│   │   ├── Biography.jsx             # About section component
│   │   ├── Departments.jsx           # Departments showcase
│   │   ├── Footer.jsx                # Site footer
│   │   ├── Hero.jsx                  # Landing hero section
│   │   ├── MessageForm.jsx           # Contact form
│   │   ├── Navbar.jsx                # Navigation bar
│   │   ├── ProtectedRoute.jsx        # Route protection
│   │   └── Skeleton.jsx              # Loading skeleton
│   ├── layouts/                      # Layout components
│   │   ├── AuthLayout.jsx            # Authentication layout
│   │   └── MainLayout.jsx            # Main app layout
│   ├── pages/                        # Page components
│   │   ├── admin/                    # Admin pages
│   │   │   ├── AdminDashboard.jsx    # Admin main dashboard
│   │   │   └── addNewDoctor.jsx      # Add doctor form
│   │   ├── doctor/                   # Doctor pages
│   │   │   ├── AppointmentSchedule.jsx # Doctor appointments view
│   │   │   ├── DoctorDashboard.jsx   # Doctor main dashboard
│   │   │   ├── ReportGeneration.jsx  # Medical report creation
│   │   │   └── ViewReports.jsx       # Doctor's reports view
│   │   ├── patient/                  # Patient pages
│   │   │   ├── Appointments.jsx      # Patient appointments view
│   │   │   ├── AppointmentView.jsx   # Appointment details
│   │   │   ├── PatientDashboard.jsx  # Patient main dashboard
│   │   │   ├── ReportView.jsx        # Medical report viewer
│   │   │   └── UpdatePatient.jsx     # Patient profile update
│   │   ├── About.jsx                 # About page
│   │   ├── Appointment.jsx           # Appointment booking page
│   │   ├── Contact.jsx               # Contact page
│   │   ├── Home.jsx                  # Landing page
│   │   ├── Login.jsx                 # Login page
│   │   ├── NotFound.jsx              # 404 error page
│   │   └── Register.jsx              # Registration page
│   ├── App.css                       # Global styles
│   ├── App.jsx                       # Main app component
│   ├── index.css                     # Base styles
│   └── main.jsx                      # React entry point
├── package.json                      # Dependencies & scripts
└── vite.config.js                    # Vite configuration
```

## 📝 Naming Conventions

### 🗂️ File Naming
- **Components**: PascalCase (e.g., `PatientDashboard.jsx`)
- **Pages**: PascalCase (e.g., `AdminDashboard.jsx`)
- **Utilities**: camelCase (e.g., `jwtToken.js`)
- **Configs**: lowercase (e.g., `config.env`)
- **Models**: PascalCase with `.Model.js` suffix
- **Controllers**: PascalCase with `.Controller.js` suffix
- **Routes**: PascalCase with `.Route.js` suffix

### 📁 Folder Naming
- **Lowercase**: `components`, `pages`, `utils`, `config`
- **Role-based**: `admin`, `doctor`, `patient`
- **Feature-based**: `appointments`, `reports`, `users`

### 🏷️ Variable Naming
- **camelCase**: `firstName`, `appointmentId`, `userRole`
- **Constants**: `UPPER_SNAKE_CASE`
- **Components**: `PascalCase`
- **Functions**: `camelCase` with descriptive verbs

### 🎯 Component Structure
```jsx
// Import order
import React from 'react';           // React imports first
import { useState } from 'react';     // React hooks
import axios from 'axios';            // Third-party libraries
import { Context } from '../../main'; // Local imports

const ComponentName = () => {
  // State declarations
  // Effect hooks
  // Event handlers
  // Render methods
  
  return (
    // JSX structure
  );
};

export default ComponentName;
```

### 🗄️ Database Schema Naming
- **Collections**: Singular nouns (e.g., `User`, `Appointment`)
- **Fields**: camelCase (e.g., `firstName`, `appointmentDate`)
- **References**: `Id` suffix (e.g., `patientId`, `doctorId`)

### 🛣️ Route Naming
- **REST conventions**: `/api/v1/resource/action`
- **Kebab-case**: `/admin/add-new-doctor`
- **Descriptive**: `/patient/appointments`, `/doctor/reports`

### 🎨 CSS Class Naming
- **Tailwind CSS**: Utility-first approach
- **Custom classes**: kebab-case (e.g., `admin-dashboard`)
- **BEM methodology**: For complex components

## 🔐 Authentication Routes
```
/login                    # Universal login
/register                 # User registration
/admin/dashboard          # Admin protected
/doctor/dashboard         # Doctor protected
/patient/dashboard        # Patient protected
```

## 📊 API Endpoints Structure
```
/api/v1/user/*           # User management
/api/v1/appointment/*    # Appointment handling
/api/v1/report/*         # Medical reports
/api/v1/message/*        # Contact messages
```

## 🎯 Key Features
- **Role-based Access**: Admin, Doctor, Patient
- **Protected Routes**: Authentication required
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error management
- **Loading States**: Skeleton components
- **File Uploads**: Image handling for avatars
- **Real-time Updates**: Dynamic data fetching

## 📱 Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

This structure ensures maintainability, scalability, and clear separation of concerns across the entire hospital management system.