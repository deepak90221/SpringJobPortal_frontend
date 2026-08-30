
# 💼 Job Portal

A full-stack **Job Portal web application** built using **Spring Boot, React, MySQL, and REST APIs**. The application allows users to browse jobs, register/login, manage their profiles, and apply for jobs. Administrators can manage job postings and view applications.

## 🚀 Live Demo

### Frontend

https://spring-job-portal-frontend-web.vercel.app/

### Backend

https://springbootjobportal-copy-production.up.railway.app/

---

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* HTML
* CSS
* JavaScript

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Database

* MySQL

### Deployment

* Vercel – Frontend
* Railway – Backend & MySQL

### Email

* Gmail SMTP
* Spring Boot Mail

---

## ✨ Features

### 👤 User Features

* User Registration
* User Login
* User Profile
* Update Account Details
* Delete Account
* Browse Available Jobs
* View Job Details
* Apply for Jobs
* View My Applications
* Logout

### 👨‍💼 Admin Features

* Admin Login
* Admin Dashboard
* Add Jobs
* View Jobs
* Update Jobs
* Delete Jobs
* View Applications
* Manage Job Listings
* Admin Logout

---

## 🏗️ Project Structure

### Backend

```text
SpringJobportal/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/JobPortal/SpringJobportal/
│       │       │
│       │       ├── config/
│       │       │   └── CorsConfig.java
│       │       │
│       │       ├── controller/
│       │       │   ├── AuthController.java
│       │       │   ├── JobController.java
│       │       │   └── ...
│       │       │
│       │       ├── model/
│       │       │   ├── User.java
│       │       │   ├── Job.java
│       │       │   └── ...
│       │       │
│       │       ├── repository/
│       │       │   ├── UserRepository.java
│       │       │   ├── JobRepository.java
│       │       │   └── ...
│       │       │
│       │       ├── service/
│       │       │   └── MailService.java
│       │       │
│       │       └── SpringJobportalApplication.java
│       │
│       └── resources/
│           └── application.properties
│
└── pom.xml
```

### Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── ...
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| POST   | `/auth/register`        | Register a user  |
| POST   | `/auth/login`           | Login user       |
| GET    | `/auth/profile/{email}` | Get user profile |
| PUT    | `/auth/update/{email}`  | Update account   |
| DELETE | `/auth/delete/{email}`  | Delete account   |

### Jobs

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | `/jobs/add`         | Add a new job |
| GET    | `/jobs/all`         | Get all jobs  |
| GET    | `/jobs/{id}`        | Get job by ID |
| PUT    | `/jobs/update/{id}` | Update job    |
| DELETE | `/jobs/delete/{id}` | Delete job    |

---

## ⚙️ Environment Variables

The application uses environment variables for sensitive deployment configuration.

### Railway Backend

```text
MYSQLHOST
MYSQLPORT
MYSQLDATABASE
MYSQLUSER
MYSQLPASSWORD

MAIL_USERNAME
MAIL_PASSWORD
```

These values should be configured in Railway rather than committed to GitHub.

---

## 🗄️ Database Configuration

The backend connects to MySQL using Railway's database environment variables.

Example:

```properties
spring.datasource.url=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC

spring.datasource.username=${MYSQLUSER}
spring.datasource.password=${MYSQLPASSWORD}

spring.jpa.hibernate.ddl-auto=update
```

---

## 🌐 CORS Configuration

The backend allows requests from the deployed Vercel frontend and the local React development server.

```text
http://localhost:5173

https://spring-job-portal-frontend-web.vercel.app
```

---

## 💻 Running the Backend Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Open the backend project

```bash
cd SpringJobportal
```

### 3. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE jobportal;
```

### 4. Configure `application.properties`

For local development:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

### 5. Run the application

Using Maven:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

## 💻 Running the Frontend Locally

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## ☁️ Deployment

### Backend – Railway

1. Push the Spring Boot backend to GitHub.
2. Create a Railway project.
3. Connect the GitHub repository.
4. Add a MySQL service.
5. Configure the required environment variables.
6. Deploy the Spring Boot application.
7. Railway provides the public backend URL.

### Frontend – Vercel

1. Push the React frontend to GitHub.
2. Import the repository into Vercel.
3. Select the frontend project.
4. Configure the build settings.
5. Deploy the application.
6. Update the Axios `baseURL` to point to the Railway backend.

Example:

```javascript
import axios from "axios";

const API = axios.create({
    baseURL: "https://springbootjobportal-copy-production.up.railway.app"
});

export default API;
```

---

## 🔐 Security Notes

* Do not commit database passwords to GitHub.
* Do not commit Gmail passwords or app passwords.
* Use Railway environment variables for production secrets.
* Keep sensitive credentials outside source code.
* Configure CORS only for trusted frontend domains.

---

## 📸 Application

The application provides separate experiences for:

**Users**

```text
Home
 ↓
Register / Login
 ↓
Browse Jobs
 ↓
View Job
 ↓
Apply
 ↓
My Applications
```

**Administrators**

```text
Admin Login
 ↓
Admin Dashboard
 ↓
Manage Jobs
 ↓
View Applications
```

---

## 📌 Future Improvements

* JWT-based authentication
* Password encryption using BCrypt
* Role-based authorization
* Admin registration management
* Job search and filtering
* Resume upload
* Application status tracking
* Pagination
* Email notifications
* Improved admin dashboard
* Forgot password functionality

---

## 👨‍💻 Author

**Deepak**

Full-Stack Job Portal Project

Built with ❤️ using React, Spring Boot, and MySQL.
