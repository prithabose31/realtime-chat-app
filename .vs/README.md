<div align="center">

# 💬 Real-Time Chat Application

**A production-grade full-stack real-time chat application with user authentication**

[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-10.0-blue)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![SignalR](https://img.shields.io/badge/SignalR-WebSockets-purple)](https://dotnet.microsoft.com/apps/aspnet/signalr)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)](https://www.mysql.com/)

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)
- [What I Learned](#what-i-learned)
- [Contact](#contact)

---

## 🎯 Overview

A modern, scalable real-time chat application built with **ASP.NET Core 10**, **SignalR**, and **React**. This project demonstrates enterprise-level architecture, real-time communication patterns, and full-stack development skills.

**Why I Built This:**
To showcase my ability to build production-ready applications with modern web technologies, focusing on real-time features, security, and scalable architecture.

---

## ✨ Key Features

### Core Functionality
- ✅ **Real-time messaging** using WebSocket (SignalR)
- ✅ **User authentication** with secure password hashing
- ✅ **Persistent message storage** in MySQL database
- ✅ **Message history** with automatic loading
- ✅ **User presence tracking** (online/offline status)
- ✅ **Auto-reconnection** on network interruption
- ✅ **Input validation** and sanitization

### Technical Highlights
- 🔐 **Security:** SHA-256 password hashing, CORS configuration, SQL injection prevention
- ⚡ **Performance:** Async/await patterns, Entity Framework optimization
- 🏗️ **Architecture:** Clean separation of concerns, RESTful API design
- 📱 **Responsive UI:** Mobile-friendly pastel design with smooth animations
- 🗄️ **Database:** Relational data modeling with EF Core migrations

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **ASP.NET Core 10** | Web API framework |
| **SignalR** | Real-time WebSocket communication |
| **Entity Framework Core 9** | ORM for database operations |
| **MySQL 8.0** | Relational database |
| **C# 12** | Primary programming language |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Fast development build tool |
| **JavaScript (ES6+)** | Client-side logic |
| **CSS3** | Modern styling with flexbox/grid |

### Tools & DevOps
- **Git** - Version control
- **Visual Studio Code** - Development environment
- **Postman** - API testing
- **MySQL Workbench** - Database management

---

## 🏗️ Architecture

┌─────────────────┐ WebSocket (SignalR) ┌─────────────────┐
│ React Client │ ◄──────────────────────────────► │ ASP.NET Core │
│ (Port 5173) │ │ (Port 5001) │
└─────────────────┘ HTTP REST API └─────────────────┘
◄──────────────────────────────► │
│
▼
┌─────────────────┐
│ MySQL 8.0 │
│ Database │
└─────────────────┘

text

**Design Patterns Used:**
- Repository Pattern for data access
- Dependency Injection for loose coupling
- Hub pattern for real-time communication
- RESTful API design principles

---

## 📸 Screenshots

### Login Screen
![Login](screenshots/login.png)

### Chat Interface
![Chat](screenshots/chat.png)

### Real-time Messaging
![Demo](screenshots/demo.gif)

---

## 🚀 Getting Started

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [MySQL 8.0](https://dev.mysql.com/downloads/mysql/)
- Git

### Installation

#### 1. Clone the repository
git clone https://github.com/prithabose31/realtime-chat-app.git
cd realtime-chat-app

text

#### 2. Backend Setup
cd ChatApp.API

Update connection string in appsettings.json
"server=localhost;database=ChatAppDb;user=root;password=YOUR_PASSWORD"
Restore dependencies
dotnet restore

Apply database migrations
dotnet ef database update

Run the API
dotnet run

text
Backend runs on: `https://localhost:5001`

#### 3. Frontend Setup
cd ../chatapp-client

Install dependencies
npm install

Start development server
npm run dev

text
Frontend runs on: `http://localhost:5173`

#### 4. Open your browser
Navigate to `http://localhost:5173` and start chatting!

---

## 📁 Project Structure

ChatApp.Solution/
├── ChatApp.API/ # Backend ASP.NET Core project
│ ├── Controllers/
│ │ ├── AuthController.cs # Authentication endpoints
│ │ └── MessageController.cs # Message history API
│ ├── Hubs/
│ │ └── ChatHub.cs # SignalR hub for real-time
│ ├── Models/
│ │ ├── User.cs # User entity
│ │ ├── Message.cs # Message entity
│ │ └── ApplicationDbContext.cs
│ ├── Migrations/ # EF Core migrations
│ └── Program.cs # App configuration
│
├── chatapp-client/ # Frontend React project
│ ├── src/
│ │ ├── App.jsx # Main component
│ │ ├── App.css # Styling
│ │ └── main.jsx # Entry point
│ └── package.json
│
└── README.md

text

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
POST /api/auth/register
Content-Type: application/json

{
"username": "john_doe",
"email": "john@example.com",
"password": "SecurePassword123"
}

text

#### Login User
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "SecurePassword123"
}

text

### Message Endpoints

#### Get Message History
GET /api/message/history

text

### SignalR Hub Methods

#### Send Message
connection.invoke("SendMessage", username, message);

text

#### Receive Message
connection.on("ReceiveMessage", (username, message, timestamp) => {
// Handle incoming message
});

text

---

## 🚀 Future Enhancements

- [ ] **JWT Authentication** - Token-based auth for better security
- [ ] **Private Messaging** - Direct messages between users
- [ ] **File Sharing** - Image and document uploads
- [ ] **Typing Indicators** - Show when users are typing
- [ ] **Read Receipts** - Message delivery confirmation
- [ ] **User Profiles** - Avatars and bio information
- [ ] **Dark Mode** - Theme toggle
- [ ] **Message Reactions** - Emoji reactions to messages
- [ ] **Search Functionality** - Search through message history
- [ ] **Redis Caching** - Improve performance at scale
- [ ] **Docker Deployment** - Containerization for easy deployment

---

## 📚 What I Learned

Building this project helped me master:

1. **Real-time Communication:** Implementing WebSocket using SignalR for bi-directional communication
2. **Full-Stack Development:** Connecting React frontend with ASP.NET Core backend
3. **Database Design:** Creating relational schemas and using EF Core migrations
4. **Security Best Practices:** Password hashing, input validation, CORS configuration
5. **Async Programming:** Utilizing async/await for better performance
6. **API Design:** Building RESTful endpoints with proper HTTP methods
7. **State Management:** Managing complex state in React with hooks
8. **Problem Solving:** Debugging connection issues, handling edge cases

---

## 👨‍💻 About Me

**Pritha Bose**

Full-Stack Developer passionate about building scalable web applications

- 🌐 Portfolio: [your-portfolio.com](#)
- 💼 LinkedIn: [linkedin.com/in/prithabose31](https://linkedin.com/in/prithabose31)
- 📧 Email: prithabose2002@gmail.com
- 🐙 GitHub: [@prithabose31](https://github.com/prithabose31)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [SignalR Documentation](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
- [React Documentation](https://react.dev/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by Pritha Bose

</div>