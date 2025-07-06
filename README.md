# 🛠️ Project Flow – Kanban-style Task Tracker

**Project Flow** is a sleek, responsive project & task management web app inspired by modern tools like Trello and Asana, built for individuals and teams to stay organized and productive.

---

## 🚀 Features

- 📝 **User Authentication** – Secure sign-up, login, token refresh, and logout  
- 📁 **Project-Based Organization** – Users can create multiple projects  
- 📌 **Task Management** – Create, update, delete, and move tasks across statuses  
- 🏷️ **Tags & Priorities** – Assign tags, priority levels, and due dates  
- 📅 **Due Date Management** – Schedule deadlines to stay on track  
- 👥 **User Assignment** – Assign tasks to team members  
- 🔄 **Drag & Drop Support** – Move tasks between columns easily  
- 🔐 **Protected Routes with JWT** – Ensures secure access control   
- ⚙️ **Profile Management** – Edit username, email, and password 

---

## 🏗️ Tech Stack

| Layer        | Technologies                                    |
|--------------|------------------------------------------------|
| **Frontend** | React (with Vite)                              |
| **Backend**  | Node.js, Express.js, MongoDB (with Mongoose)  |

---

## 📁 Project Structure

```
project-Flow/
│
├── backend/
│   ├── controllers/     # Route logic for users, tasks, contacts, etc.
│   ├── models/          # Mongoose models (User, Task, Project, etc.)
│   ├── routes/          # API route definitions
│   ├── middleware/      # Auth, error handlers
│   ├── config/          # DB connection and env config
│   └── server.js        # Main Express server entry
│
├── frontend/
│   ├── components/      # React components (KanbanBoard, TaskModal, etc.)
│   ├── pages/           # Auth, Dashboard, Profile, Kanban pages
│   ├── context/         # Auth and global state providers
│   ├── services/        # API service handlers
│   ├── App.jsx          # App routes and layout
│   └── main.jsx         # Vite entry point
│
├── .env                 # Environment config
├── README.md            # Project documentation
└── package.json
```

---

## 🔐 API Routes

### 👤 User Routes (`/user`)

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/user/register`          | Register a new user                |
| POST   | `/user/login`             | Login and receive JWT tokens       |
| GET    | `/user/current`           | Get current user info (protected)  |
| PUT    | `/user/update-username`   | Update username                    |
| PUT    | `/user/update-email`      | Update email                       |
| PUT    | `/user/change-password`   | Change password                    |
| POST   | `/user/refresh`           | Refresh JWT access token           |
| POST   | `/user/logout`            | Logout the user                    |
| GET    | `/user/all`               | Get all registered users           |

### 🔐 Protected Routes (`/api`)

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/api/dashboard` | Access dashboard data            |
| GET    | `/api/profile`   | Get profile info of current user |

### 📇 Contact Routes (`/api/contacts`)

| Method | Endpoint                | Description                               |
|--------|-------------------------|-------------------------------------------|
| GET    | `/api/contacts`         | Get all contacts (paginated, searchable) |
| POST   | `/api/contacts`         | Create a new contact                      |
| GET    | `/api/contacts/:id`     | Get contact by ID                         |
| PUT    | `/api/contacts/:id`     | Update a contact                          |
| DELETE | `/api/contacts/:id`     | Soft-delete a contact                     |

### 📌 Kanban Routes (`/api/kanban`)

| Method | Endpoint                                | Description                          |
|--------|-----------------------------------------|--------------------------------------|
| GET    | `/api/kanban/projects`                  | Fetch project list                   |
| GET    | `/api/kanban/projects/:name/board`      | Fetch Kanban board data by project   |
| POST   | `/api/kanban/projects/:name/tasks`      | Create a new task in the project     |
| PUT    | `/api/kanban/tasks/:id`                 | Update a task                        |
| DELETE | `/api/kanban/tasks/:id`                 | Delete a task                        |
| PUT    | `/api/kanban/tasks/:id/move`            | Move a task between columns          |
| GET    | `/api/kanban/users`                     | Get users available for assignment   |

---

## 🔧 Setup & Run Locally

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/Sahitha-chunduri/project-Flow.git
cd project-Flow
```

### 2. Install Dependencies & Configure

#### Backend Setup
```bash
cd backend
cp .env.example .env
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory with:
```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

### 3. Launch Development Servers

- **Backend**: 
  ```bash
  cd backend
  node server.js
  ```
  Usually runs on http://localhost:5000

- **Frontend**: 
  ```bash
  cd frontend
  npm run dev
  ```
  Typically runs on http://localhost:3000 or Vite-provided port

---

## 🚀 Future Enhancements

- 📨 Email reminders for impending due dates
- 📎 Task attachments (images / docs)
- 🔒 Advanced role-based access (Admin, Editor, Viewer)
- 📊 Dashboard charts and analytics

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
