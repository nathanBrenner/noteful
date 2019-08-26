import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import NoteDescription from '../NoteDescription/NoteDescription';
import './Main.css';
class Main extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    return (
      <div className="Main">
        {notes.map(note => (
          <NoteDescription key={note.id} note={note} />
        ))}
        <Link className="Main-add" to="/note">
          Add note
        </Link>
      </div>
    );
  }
}

export default Main;
