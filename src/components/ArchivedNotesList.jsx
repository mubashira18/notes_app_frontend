import React from "react";

const ArchivedNotesList = ({
  archivedNotes,
  unarchiveNote,
  deletePermanently,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Archived Notes</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {archivedNotes.map((note) => (
          <div key={note._id} className="border p-4 rounded-md">
            <h3 className="font-bold text-blue-600 mb-2">{note.title}</h3>
            <p className="text-gray-700 mb-2">{note.content}</p>
            <div className="flex justify-between">
              <button
                onClick={() => unarchiveNote(note._id)}
                className="text-blue-500 hover:underline"
              >
                Unarchive
              </button>
              <button
                onClick={() => deletePermanently(note._id)}
                className="text-red-500 hover:underline"
              >
                Move to trash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedNotesList;
