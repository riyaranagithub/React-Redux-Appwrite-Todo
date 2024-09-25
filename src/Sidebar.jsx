import React from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "./TodoSlice";
import dbService from "./appwrite/database";

function Sidebar({ todos, createNote, setCurrentNoteId, CurrentNote }) {
  const dispatch = useDispatch();
  const noteElements = todos.map((note) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === CurrentNote.id ? "selected-note" : ""}`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.text.split("\n")[0]}</h4>
        {note.id === CurrentNote.id ? (
          <button
            onClick={() => {
              dbService
                .deleteNote(note.id)
                .then(() => {
                  dispatch(deleteTodo(note.id));
                })
                .catch((error) => console.error("Error deleting note:", error));
            }}
          >
            <MdDelete />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ));

  return (
    <div>
      <section className="pane sidebar">
        <div className="sidebar--header">
          <h3>Notes</h3>
          <button className="new-note" onClick={createNote}>
            +
          </button>
        </div>
        {noteElements}
      </section>
    </div>
  );
}

export default Sidebar;
