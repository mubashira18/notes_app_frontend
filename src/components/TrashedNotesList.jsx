import React from "react";

const TrashedNotesList = ({ trashedNotes, deletePermanently }) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Trashed Notes</h2>
      <ul>
        {trashedNotes &&
          trashedNotes.map((note) => (
            <li key={note._id} className="mb-2">
              <span className="font-bold">{note.title}</span>{" "}
              <button
                onClick={() => deletePermanently(note._id)}
                className="text-red-500 hover:underline"
              >
                Delete Permanently
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TrashedNotesList;
