import React, { useState } from "react";

const AddNoteForm = ({ addNote, newNote, setNewNote }) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={newNote.tags}
        onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="color"
        value={newNote.color}
        onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
        className="border p-2 rounded mb-2"
      />
      <button
        onClick={addNote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </>
  );
};

export default AddNoteForm;
