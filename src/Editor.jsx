import React from "react";
import { useDispatch } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import MarkdownView from "react-showdown"; 
import { notes } from "./TodoSlice";
import dbService from "./appwrite/database";

export default function Editor({ currentNote }) {
  const dispatch = useDispatch();

  // Dispatch function to update the note
  const updateNote = (newBody) => {
    dbService.updateNote(currentNote.id,newBody)
    .then((response)=>dispatch(notes({ id: response.$id, text: response.note })))
    
    
   
  };

  return (
    <section className="pane editor">
      <MDEditor
        value={currentNote?.text || ""}
        onChange={updateNote}
      />

      <MarkdownView markdown={currentNote?.text || ""} />
    </section>
  );
}
