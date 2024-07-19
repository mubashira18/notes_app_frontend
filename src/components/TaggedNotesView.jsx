import React, { useState, useEffect } from "react";
import axios from "axios";
import NotesList from "./NotesList";

const TaggedNotesView = ({ tag }) => {
  const [taggedNotes, setTaggedNotes] = useState([]);

  useEffect(() => {
    fetchTaggedNotes();
  }, [tag]);

  const fetchTaggedNotes = async () => {
    try {
      const response = await axios.get(
        `https://notes-backend-x50e.onrender.com/api/notes/tag/${tag}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setTaggedNotes(response.data);
    } catch (error) {
      console.error("Error fetching tagged notes:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Notes with Tag: {tag}</h1>
      <NotesList notes={taggedNotes} />
    </div>
  );
};

export default TaggedNotesView;
