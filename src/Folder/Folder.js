import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import NotefulContext from '../NotefulContext';

class Folder extends React.Component {
  static contextType = NotefulContext;

  render() {
    const filteredNotes = this.context.notes.filter(
      ({ folderId }) => folderId === this.props.match.params.id
    );
    return (
      <div>
        {filteredNotes.map(note => (
          <NoteDescription note={note} key={note.id} />
        ))}
        <button className="Main-add">Add note</button>
      </div>
    );
  }
}

export default Folder;
