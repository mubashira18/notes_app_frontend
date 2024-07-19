import React, { useState } from "react";

const NotesList = ({ notes, archiveNote, deleteNote, editNote }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState({
    _id: "",
    title: "",
    content: "",
    tags: [],
    color: "#ffffff",
  });

  const handleEdit = (note) => {
    setEditedNote({
      _id: note._id,
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
      color: note.color,
    });
    setEditMode(true);
  };

  const handleSave = () => {
    editNote(editedNote._id, {
      title: editedNote.title,
      content: editedNote.content,
      tags: editedNote.tags.split(",").map((tag) => tag.trim()),
      color: editedNote.color,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    setEditedNote({
      ...editedNote,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="border p-4 rounded shadow hover:shadow-lg m-4 my-4"
          style={{ backgroundColor: note.color }}
        >
          {editMode && editedNote._id === note._id ? (
            <div>
              <input
                type="text"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                placeholder="Title"
              />
              <textarea
                name="content"
                value={editedNote.content}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                placeholder="Content"
              />
              <input
                type="text"
                name="tags"
                value={editedNote.tags}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                placeholder="Tags (comma-separated)"
              />
              <input
                type="color"
                name="color"
                value={editedNote.color}
                onChange={handleChange}
                className="border p-2 mb-2"
              />
              <div className="mt-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-2">{note.title}</h2>
              <p className="mb-2">{note.content}</p>
              <div className="flex flex-wrap mb-2">
                {note?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => archiveNote(note._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Archive
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
