import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import store from '../dummy-store';
import './Note.css';

const Note = props => {
  const note = store.notes.find(({ id }) => id === props.match.params.id);
  return (
    <div>
      <NoteDescription note={note} />
      <p className="Note-content">{note.content}</p>
    </div>
  );
};

export default Note;
