import React, { useState, useEffect } from "react";
import axios from "axios";
import NotesList from "./NotesList";
import Modal from "./Modal";
import AddNoteForm from "./AddNoteForm";
import ArchivedNotesList from "./ArchivedNotesList";
import TrashedNotesList from "./TrashedNotesList";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [view, setView] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [tagSearchQuery, setTagSearchQuery] = useState(""); // New state for tag search
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
    color: "#ffffff",
  });

  useEffect(() => {
    fetchNotes();
    fetchArchivedNotes();
    fetchTrashedNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "https://notes-backend-x50e.onrender.com/api/notes",
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchArchivedNotes = async () => {
    try {
      const response = await axios.get(
        "https://notes-backend-x50e.onrender.com/api/notes/archive",
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setArchivedNotes(response.data);
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

  const fetchTrashedNotes = async () => {
    try {
      const response = await axios.get(
        "https://notes-backend-x50e.onrender.com/api/notes/trash",
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setTrashedNotes(response.data);
    } catch (error) {
      console.error("Error fetching trashed notes:", error);
    }
  };

  const archiveNote = async (id) => {
    try {
      await axios.put(
        `https://notes-backend-x50e.onrender.com/api/notes/${id}`,
        {
          archived: true,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setNotes(notes.filter((note) => note._id !== id));
      fetchArchivedNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await axios.put(
        `https://notes-backend-x50e.onrender.com/api/notes/unarchive/${id}`,
        {},
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setArchivedNotes(archivedNotes.filter((note) => note._id !== id));
      fetchNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://notes-backend-x50e.onrender.com/api/notes/${id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const deletePermanently2 = async (id) => {
    try {
      await axios.delete(
        `https://notes-backend-x50e.onrender.com/api/notes/${id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setArchivedNotes(archivedNotes.filter((note) => note._id !== id));
      setTrashedNotes(trashedNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note permanently:", error);
    }
  };

  const deletePermanently = async (id) => {
    try {
      await axios.delete(
        `https://notes-backend-x50e.onrender.com/api/notes/permanent/${id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      setTrashedNotes(trashedNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note permanently:", error);
    }
  };

  const addNote = async () => {
    try {
      await axios.post(
        "https://notes-backend-x50e.onrender.com/api/notes",
        {
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags.split(",").map((tag) => tag.trim()),
          color: newNote.color,
        },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setNewNote({
        title: "",
        content: "",
        tags: "",
        color: "#ffffff",
      });
      setShowModal(false);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const editNote = async (id, updatedNote) => {
    try {
      await axios.put(
        `https://notes-backend-x50e.onrender.com/api/notes/${id}`,
        updatedNote,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      fetchNotes();
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  // Filter notes by title search query
  const filteredNotesByTitle = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter notes by tag search query
  const filteredNotesByTag = filteredNotesByTitle.filter((note) =>
    note.tags.some((tag) =>
      tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Notes Management</h1>

      {/* Buttons for switching views */}
      <div className="mb-4 flex justify-center align-items-center my-2">
        <button
          onClick={() => {
            setView("notes");
            fetchNotes();
          }}
          className={`mr-2 ${
            view === "notes" ? "bg-blue-500 text-white" : "bg-gray-200"
          } py-2 px-4 rounded`}
        >
          Notes
        </button>
        <button
          onClick={() => {
            setView("archive");
            fetchArchivedNotes();
          }}
          className={`mr-2 ${
            view === "archive" ? "bg-blue-500 text-white" : "bg-gray-200"
          } py-2 px-4 rounded`}
        >
          Archived
        </button>
        <button
          onClick={() => {
            setView("trash");
            fetchTrashedNotes();
          }}
          className={`mr-2 ${
            view === "trash" ? "bg-blue-500 text-white" : "bg-gray-200"
          } py-2 px-4 rounded`}
        >
          Trash
        </button>
      </div>

      {/* Search input */}
      <div className="mb-4 flex justify-center align-items-center space-x-2">
        <input
          type="text"
          placeholder="Search notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded mb-4 w-48"
        />

        {/* New Tag Search input */}
        {view === "notes" && (
          <input
            type="text"
            placeholder="Search by tag"
            value={tagSearchQuery}
            onChange={(e) => setTagSearchQuery(e.target.value)}
            className="border p-2 rounded mb-4 w-48"
          />
        )}
      </div>
      {/* Conditional rendering based on view */}
      {view === "notes" && (
        <>
          <NotesList
            notes={filteredNotesByTag}
            editNote={editNote}
            archiveNote={archiveNote}
            deleteNote={deleteNote}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded m-auto"
          >
            Add Note 📄
          </button>
        </>
      )}

      {view === "archive" && (
        <ArchivedNotesList
          archivedNotes={archivedNotes}
          unarchiveNote={unarchiveNote}
          deletePermanently={deletePermanently2}
        />
      )}

      {view === "trash" && (
        <TrashedNotesList
          trashedNotes={trashedNotes}
          deletePermanently={deletePermanently}
        />
      )}

      {/* Modal for adding notes */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <AddNoteForm
          addNote={addNote}
          newNote={newNote}
          setNewNote={setNewNote}
        />
      </Modal>
    </div>
  );
};

export default Notes;
