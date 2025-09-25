import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "users_v1";

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const initialState = {
  items: loadFromLocal(),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser(state, action) {
      state.items.unshift(action.payload);
    },
    updateUser(state, action) {
      const { id, changes } = action.payload;
      state.items = state.items.map((u) =>
        u.id === id ? { ...u, ...changes } : u
      );
    },
    deleteUser(state, action) {
      const id = action.payload;
      state.items = state.items.filter((u) => u.id !== id);
    },
    setUsers(state, action) {
      state.items = action.payload;
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const { createUser, updateUser, deleteUser, setUsers, clearAll } =
  usersSlice.actions;
export default usersSlice.reducer;
