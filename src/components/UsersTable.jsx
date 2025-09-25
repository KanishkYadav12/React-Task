import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/usersSlice";

export default function UsersTable({ users, onEdit }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    if (confirm("Delete this user? This action cannot be undone.")) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <div className="card tableCard">
      <table className="usersTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Active</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="empty">
                No users. Create one!
              </td>
            </tr>
          )}

          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.course}</td>
              <td>{u.active ? "Yes" : "No"}</td>
              <td>
                {u.birthDate ? new Date(u.birthDate).toLocaleDateString() : "-"}
              </td>
              <td>
                <button className="btn" onClick={() => onEdit(u)}>
                  Edit
                </button>
                <button
                  className="btn danger"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
