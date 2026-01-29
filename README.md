# Project Camp Backend

A sophisticated, production-grade project management backend system built with a focus on security, scalability, and granular access control. Leveraging the power of **Node.js, Express, and MongoDB**, it provides a comprehensive API for collaborative team environments.

---

## 🌟 Core Modules & Functionality

### 1. 🔐 Superior Authentication System
- **Email Verification Flow:** Uses secure tokens and `Nodemailer` with `Mailgen` templates to ensure user authenticity.
- **Dual-Token Strategy:** Implementation of JWT-based Access Tokens (short-lived) and Refresh Tokens (long-lived) stored in secure, `httpOnly` cookies.
- **Password Lifecycle:** Robust security using `bcrypt` for hashing, with complete flows for forgotten passwords, resets, and secure changes.

### 2. 🏗️ Project Organization
- **Isolation:** Projects act as secure containers. Members only have access to projects they are explicitly invited to.
- **Member Roles:** Granular control within projects using three distinct roles: `Admin`, `Project Admin`, and `Member`.

### 3. 📋 Advanced Task Management
- **Hierarchical Tasks:** Tasks support nested **Subtasks**, allowing for detailed project breakdown.
- **Resource Attachments:** Integrated file upload capability using `Multer`, allowing tasks to hold up to 5 attachments (images/docs).
- **Interactive State:** Real-time-ready status tracking (`Todo` -> `In Progress` -> `Done`).

### 4. 📓 Integrated Project Notes
- **Centralized Knowledge:** A dedicated space for project-level documentation and quick notes.
- **Admin Managed:** Ensuring high-quality project documentation through role-restricted creation and editing.

---

## 📂 Folder Structure

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
│   │   ├── healthcheck.controllers.js
│   │   ├── note.controllers.js
│   │   ├── project.controllers.js
│   │   └── task.controllers.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── multer.middleware.js
│   │   └── validator.middleware.js
│   │
│   ├── models/
│   │   ├── note.models.js
│   │   ├── project.models.js
│   │   ├── projectmember.models.js
│   │   ├── subtask.models.js
│   │   ├── task.models.js
│   │   └── user.models.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── note.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
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

## Detailed API Reference

### 🔑 Authentication Module (`/api/v1/auth`)
| Method | Endpoint | Description | Interaction |
|:-------|:---------|:------------|:------------|
| `POST` | `/register` | Create a new account | Public |
| `POST` | `/login` | Authenticate & get tokens | Public |
| `GET` | `/verify-email/:vToken` | Activate account | Public |
| `POST` | `/refresh-token` | Renew expired access token | Public |
| `POST` | `/forgot-password` | Request reset link | Public |
| `POST` | `/reset-password/:rToken`| Update forgotten password | Public |
| `POST` | `/logout` | Invalidate current session | Secured |
| `GET` | `/current-user` | Retrieve profile data | Secured |
| `POST` | `/change-password` | Update known password | Secured |

### 📁 Projects Module (`/api/v1/projects`)
| Method | Endpoint | Description | Permission |
|:-------|:---------|:------------|:-----------|
| `GET` | `/` | List all accessible projects | Member+ |
| `POST` | `/` | Initialize a new project | Admin |
| `GET` | `/:projectId` | Fetch project workspace | Member+ |
| `PUT` | `/:projectId` | Update project metadata | Admin |
| `DELETE` | `/:projectId` | Remove project & assets | Admin |
| `POST` | `/:projectId/members` | Invite new team member | Admin |
| `DELETE`| `/:projectId/members/:uId`| Evict member from project | Admin |

### 📝 Tasks Module (`/api/v1/tasks`)
| Method | Endpoint | Description | Permission |
|:-------|:---------|:------------|:-----------|
| `GET` | `/:projectId` | Fetch project task board | Member+ |
| `POST` | `/:projectId` | Create task with media | Admin/P.Admin|
| `PUT` | `/:projectId/t/:tId` | Modify task/append media | Admin/P.Admin|
| `POST` | `/:projectId/t/:tId/subtasks`| Define a new subtask | Admin/P.Admin|
| `PUT` | `/:projectId/st/:stId`| Toggle subtask completion | Member+ |

---

## 🛡️ Security & Middleware Architecture

- **`auth.middleware.js`**:
    - `verifyJWT`: Validates the bearer token or cookie-based JWT.
    - `validateProjectPermission`: A factory middleware that checks if a user has the required project-specific role (`Admin`, `Project Admin`, or `Member`) before allowing route access.
- **`validator.middleware.js`**: Uses `express-validator` to intercept requests and ensure data integrity before reaching the business logic.
- **`multer.middleware.js`**: Configures storage engine and file filters for secure image/document uploads to `public/images`.

---

## Role-Based Access Control (RBAC)

| Action | Admin | Project Admin | Member |
|:-------|:---:|:---:|:---:|
| Project Management (CRUD) | ✅ | ❌ | ❌ |
| Member Invitation/Role Assignment | ✅ | ❌ | ❌ |
| Task/Subtask Creation & Deletion | ✅ | ✅ | ❌ |
| Subtask Status Toggling | ✅ | ✅ | ✅ |
| Project Notes Management | ✅ | ❌ | ❌ |
| Content Viewing (Read-Only) | ✅ | ✅ | ✅ |

---

## 🛠 Installation & High-Speed Setup

1. **Clone the Source**
   ```bash
   git clone https://github.com/shubhanshu2006/Project-Camp-Backend.git
   cd project-camp-backend
   ```

2. **Dependency Injection**
   ```bash
   npm install
   ```

3. **Establish Environment**
   Create a `.env` in the root:
   ```env
   PORT=your_port
   SERVER_URL=your_url
   MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/projectcamp
   
   ACCESS_TOKEN_SECRET=highly_complex_string_1
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=highly_complex_string_2
   REFRESH_TOKEN_EXPIRY=10d
   
   MAILTRAP_SMTP_HOST=smtp.mailtrap.io
   MAILTRAP_SMTP_PORT=2525
   MAILTRAP_SMTP_USER=your_credential
   MAILTRAP_SMTP_PASSWORD=your_credential
   
   FORGOT_PASSWORD_REDIRECT_URL=your_url
   ```

4. **Ignite Development**
   ```bash
   npm run dev
   ```

