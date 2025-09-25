📝 Users Manager (React + Redux Toolkit + localStorage)

A simple CRUD application built with React and Redux Toolkit that manages users. Data is persisted in the browser’s localStorage and synced with the Redux store on every change.

✨ Features

Create / Read / Update / Delete (CRUD) operations for users

Form validation:

Required fields (name, email, course, birth date)

Email format check

Birth date must not be in the future

Search bar (case-insensitive) — filter users by name, email, or course

Modal form for creating and editing users

Redux Toolkit for state management

localStorage persistence:

On app load → localStorage is read into Redux

On every change → Redux state is saved to localStorage

Responsive UI with a clean, minimal design

📸 Screenshots

Home Page (Users Table + Search + Create Button)

+-----------------------------------------------------+
| Search: [   ]                [Create New User]      |
+-----------------------------------------------------+
| Name    | Email        | Course | Active | Birth... |
|---------|--------------|--------|--------|----------|
| Alice   | a@ex.com     | React  | Yes    | 01/01/01 |
| Bob     | b@ex.com     | Node   | No     | 02/02/02 |
| ...                                             ... |
+-----------------------------------------------------+


Create / Edit User Modal

Name, Email, Course, Active checkbox, Birth Date

Inline error messages on invalid input

🛠️ Tech Stack

React 18

Vite
 for fast development & build

Redux Toolkit
 + React Redux

Browser localStorage for persistence

📂 Project Structure
src/
 ├── App.jsx                # Main layout, search, modal handling
 ├── main.jsx               # App entry, Redux Provider
 ├── store.js               # Redux store + localStorage sync
 ├── index.css              # Global styles
 ├── features/
 │    └── usersSlice.js     # Redux slice for users (reducers, actions)
 └── components/
      ├── UsersTable.jsx    # Table with user list, edit & delete buttons
      ├── UserModal.jsx     # Modal wrapper
      └── UserForm.jsx      # Create / Edit form with validation

🚀 Getting Started
1. Clone the repo
git clone https://github.com/your-username/users-manager.git
cd users-manager

2. Install dependencies
npm install

3. Run locally
npm run dev


Open the app at the URL shown in the terminal (usually http://localhost:5173
).

4. Build for production
npm run build
npm run preview

📦 Dependencies
"dependencies": {
  "@reduxjs/toolkit": "^2.x.x",
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "react-redux": "^9.x.x"
}

🔄 Data Flow

On page load, usersSlice.js loads data from localStorage into Redux.

On create / update / delete, the reducer updates Redux state.

A store.subscribe() listener serializes state.users.items to localStorage.

The UI (UsersTable) always reads from Redux, ensuring a single source of truth.

✅ Evaluation Checklist

 CRUD operations implemented

 Validation with inline error messages

 Search functionality (case-insensitive)

 Modular component design

 Redux Toolkit for state management

 Data persisted to localStorage

 Clean UI & code readability
