import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import './Main.css';
import NotefulContext from '../NotefulContext';
class Main extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    return (
      <div className="Main">
        {notes.map(note => (
          <NoteDescription key={note.id} note={note} />
        ))}
        <button className="Main-add">Add note</button>
      </div>
    );
  }
}

export default Main;
