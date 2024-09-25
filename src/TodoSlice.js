import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), text: "Add note here" }]
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    notes: (state, action) => {
      const { id, text } = action.payload;
      const existingNote = state.todos.find(note => note.id === id);

      if (existingNote) {
        // Update the existing note's text
        existingNote.text = text;
      } else {
        // If no existing note is found, add a new one
        state.todos.push({ id, text });
      }
    },
    deleteTodo: (state, action) => {
      // Filter out the todo with the given id
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
});

export const { notes, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
