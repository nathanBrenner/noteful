import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import './Main.css';
const Main = ({ notes }) => {
  return (
    <div className="Main">
      {notes.map(note => (
        <NoteDescription key={note.id} note={note} />
      ))}
      <button className="Main-add">Add note</button>
    </div>
  );
};

export default Main;
