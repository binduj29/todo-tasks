# Todo Tasks App

A full-stack Todo application built with React (TypeScript) and ASP.NET Core (C#).

---

# Features

- Add tasks with description and deadline
- Task description validation (min 10, max 70 characters)
- Mark tasks as done / reopen
- Delete tasks
- Highlight overdue tasks in red
- Filter tasks (All / Open / Done)
- Sort tasks by deadline and status
- Modal-based task creation
- Persistent storage using SQLite
- Responsive and clean UI

---

# Tech Stack

Frontend:
- React (TypeScript)
- Axios
- CSS

Backend:
- ASP.NET Core Web API
- Entity Framework Core
- SQLite

---

# Project Structure 

TodoApi/ -> Backend (ASP.NET Core) 
todo-frontend/ -> Frontend (React)

---

# How to Run the Project

 Clone repo git clone https://github.com/binduj29/todo-tasks

# Backend

cd TodoApi
dotnet restore
dotnet run
Backend URL: http://localhost:5070

# Frontend

cd todo-frontend
npm install
npm start
Frontend URL: http://localhost:3000

---

# Improvements 

Add authentication, improve UI, add state management (Redux/React Query), use Docker, deploy to cloud (Azure/AWS).
