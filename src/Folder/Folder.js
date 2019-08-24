import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import store from '../dummy-store';

const Folder = props => {
  const filteredNotes = store.notes.filter(
    ({ folderId }) => folderId === props.match.params.id
  );
  return (
    <div>
      {filteredNotes.map(note => (
        <NoteDescription note={note} key={note.id} />
      ))}
      <button className="Main-add">Add note</button>
    </div>
  );
};

export default Folder;
