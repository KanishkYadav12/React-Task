import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";

const store = configureStore({
  reducer: { users: usersReducer },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const serialized = JSON.stringify(state.users.items);
    localStorage.setItem("users_v1", serialized);
  } catch (e) {
  }
});

export default store;
