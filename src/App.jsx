import React, { useMemo, useState } from "react";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";
import { useSelector } from "react-redux";

export default function App() {
  const users = useSelector((s) => s.users.items);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.name, u.email, u.course].some((field) =>
        (field || "").toLowerCase().includes(q)
      )
    );
  }, [users, query]);

  function openCreate() {
    setEditingUser(null);
    setIsOpen(true);
  }
  function openEdit(user) {
    setEditingUser(user);
    setIsOpen(true);
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Users Manager</h1>
        <div className="controls">
          <input
            placeholder="Search by name / email / course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search users"
          />
          <button className="btn primary" onClick={openCreate}>
            Create New User
          </button>
        </div>
      </header>

      <main className="main">
        <UsersTable users={filtered} onEdit={openEdit} />
      </main>

      {isOpen && (
        <UserForm onClose={() => setIsOpen(false)} editingUser={editingUser} />
      )}
    </div>
  );
}
