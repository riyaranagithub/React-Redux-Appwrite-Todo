import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { notes } from "./TodoSlice";
import Split from "react-split";
import { nanoid } from "@reduxjs/toolkit";
import Editor from "./Editor";
import dbService from "./appwrite/database";

function App() {
 
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const [currentNoteId, setCurrentNoteId] = useState(todos[0]?.id || "");

  useEffect(() => {
   
    dbService.fetchNote()
    .then((response)=>response.documents.map((note)=>{
      return dispatch(notes({id:note.$id,text:note.note}))
    }))
    .catch((error) => console.error("Error fetching notes:", error));
    
  }, []); // Empty dependency array ensures it runs only once on mount

  const createNote = () => {
    const newNoteText = "New Note"; // Define the text for the new note
   
    dbService
      .addNote(newNoteText, "This is the note content.")
      .then((response) => { 
        dispatch(notes({ id: response.$id, text: response.note }))
        setCurrentNoteId(response.$id); // Update the current note ID
      })  // Dispatch the new note
      .catch((error) => console.error("Error adding note:", error));
    
    
  };

  function findCurrentNote() {
    return (
      todos.find((note) => note.id === currentNoteId) || todos[0]
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Split sizes={[20, 80]} direction="horizontal" className="split">
        <Sidebar
          todos={todos}
          createNote={createNote}
          currentNoteId={currentNoteId}
          setCurrentNoteId={setCurrentNoteId}
          CurrentNote={findCurrentNote()}
        />
        <Editor currentNote={findCurrentNote()} />
      </Split>
    </div>
  );
}

export default App;
