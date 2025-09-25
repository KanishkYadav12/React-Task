import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../features/usersSlice";

const empty = { name: "", email: "", course: "", active: true, birthDate: "" };

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function UserForm({ onClose, editingUser }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || "",
        email: editingUser.email || "",
        course: editingUser.course || "",
        active: !!editingUser.active,
        birthDate: editingUser.birthDate || "",
      });
      setErrors({});
    } else {
      setForm(empty);
      setErrors({});
    }
  }, [editingUser]);

  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    else if (values.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";

    if (!values.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(values.email)) e.email = "Invalid email format.";

    if (!values.course.trim()) e.course = "Course is required.";

    if (values.birthDate) {
      const d = new Date(values.birthDate);
      if (isNaN(d)) e.birthDate = "Invalid date.";
      else if (d > new Date())
        e.birthDate = "Birth date cannot be in the future.";
    } else {
      e.birthDate = "Birth date is required.";
    }

    return e;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const vals = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course.trim(),
    };
    const v = validate(vals);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, changes: vals }));
    } else {
      dispatch(
        createUser({
          ...vals,
          id: generateId(),
          createdAt: new Date().toISOString(),
        })
      );
    }
    onClose?.();
  }

  return (
    <form onSubmit={handleSubmit} className="userForm">
      <label>
        Name <span className="req">*</span>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
      </label>

      <label>
        Email <span className="req">*</span>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>

      <label>
        Course <span className="req">*</span>
        <input name="course" value={form.course} onChange={handleChange} />
        {errors.course && <div className="error">{errors.course}</div>}
      </label>

      <label className="row">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />
        <span>Active</span>
      </label>

      <label>
        Birth Date <span className="req">*</span>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </label>

      <div className="formActions">
        <button className="btn primary" type="submit">
          {editingUser ? "Save" : "Create User"}
        </button>
        <button type="button" className="btn ghost" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
