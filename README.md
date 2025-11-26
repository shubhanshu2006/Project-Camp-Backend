#  Project Camp Backend (Authentication Module)

This backend is the authentication system for **Project Camp**, built using **Node.js, Express, MongoDB, JWT, and Nodemailer**.

At the current stage, the backend includes **only the Authentication and Health Check modules**.  
(Project, Tasks, Subtasks, Notes, RBAC, etc. will be added later.)

---

##  Current Features (Implemented)

###  **Authentication**
- Register user  
- Verify email  
- Login  
- Logout  
- Get current user  
- Forgot password  
- Reset password  
- Change password  
- Resend verification email  

###  Security Features
- Password hashing using bcrypt  
- JWT access token  
- Token stored in secure cookies  
- Email verification & password reset via mail  
- Validation on all inputs  
- Central error handling  

###  Email System
- Nodemailer transport  
- Mailgen email templates  
- Verification email  
- Password reset email  

###  System Health
- `/api/v1/healthcheck` endpoint

## Authentication Routes 

###  Unsecured Routes
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/verify-email/:verificationToken` | Verify user email |
| POST | `/api/v1/auth/refresh-token` | Refresh access token |
| POST | `/api/v1/auth/forgot-password` | Send forgot password email |
| POST | `/api/v1/auth/reset-password/:resetToken` | Reset forgotten password |

---

###  Secured Routes
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/api/v1/auth/logout` | Logout user |
| POST | `/api/v1/auth/current-user` | Get current authenticated user |
| POST | `/api/v1/auth/change-password` | Change current user’s password |
| POST | `/api/v1/auth/resend-email-verification` | Resend verification email |



---

##  Folder Structure 

```text
Project-Camp-Backend/
│
├── docs/
│   └── PRD.md
│
├── public/
│   └── images/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── healthcheck.controllers.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validator.middleware.js
│   │
│   ├── models/
│   │   └── user.models.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── healthcheck.routes.js
│   │
│   ├── utils/
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   │
│   ├── validators/
│   │   └── index.js
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md

```

---

##  Installation & Setup

###  Clone the repository
```bash
git clone https://github.com/shubhanshu2006/Project-Camp-Backend.git
cd project-camp-backend
 ```
##  Install Dependencies
```bash
npm install
```
## Create .env File
```bash
PORT=5000

MONGODB_URL=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

MAILTRAP_SMTP_HOST=smtp.example.com
MAILTRAP_SMTP_PORT=587
MAILTRAP_SMTP_USER=your_mailtrap_email
MAILTRAP_SMTP_PASSWORD=your_mailtrap_email_password

FORGOT_PASSWORD_REDIRECT_URL=your_forgot-password_redirect_URL
```
## Start Development Server
```bash
npm run dev
```
