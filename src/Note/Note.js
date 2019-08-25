import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import './Note.css';
import NotefulContext from '../NotefulContext';

class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = this.context.notes.find(
      ({ id }) => id === this.props.match.params.id
    );
    return (
      <div>
        <NoteDescription note={note} />
        <p className="Note-content">{note.content}</p>
      </div>
    );
  }
}

export default Note;
