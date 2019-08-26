import React from 'react';
import { Link } from 'react-router-dom';
import NoteDescription from '../NoteDescription/NoteDescription';
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class Folder extends React.Component {
  static contextType = NotefulContext;

  render() {
    const filteredNotes = this.context.notes.filter(
      ({ folderId }) => folderId === this.props.match.params.id
    );
    return (
      <ErrorBoundary errorMessage={'Unable to show notes for this folder'}>
        <div>
          {filteredNotes.map(note => (
            <NoteDescription note={note} key={note.id} />
          ))}
          <Link className="Main-add" to="/note">
            Add note
          </Link>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Folder;
