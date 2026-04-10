This is a full-stack Todo tasks application built using React (frontend), ASP.NET Core Web API (backend), and SQLite database. 
It supports CRUD operations like creating, viewing, updating, and deleting tasks.

Architecture
React Frontend -> ASP.NET Core Web API -> SQLite Database. The frontend communicates with backend using REST APIs.

Tech Stack
Frontend: React, Axios, React Hooks
Backend: ASP.NET Core Web API, Entity Framework Core
Database: SQLite

Project Structure
TodoApi/ -> Backend (ASP.NET Core)
todo-frontend/ -> Frontend (React)

How to Run

Step 1: Clone repo
        git clone https://github.com/binduj29/todo-tasks
Step 2: Run Backend
        dotnet run --project TodoApi
        Backend URL: http://localhost:5070
Step 3: Run Frontend
        cd todo-frontend
        npm install
        npm start
        Frontend URL: http://localhost:3000

Improvements
Add authentication, improve UI, add state management (Redux/React Query), use Docker, deploy to cloud (Azure/AWS).

