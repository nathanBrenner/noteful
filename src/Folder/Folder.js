import React from 'react';
import { Link } from 'react-router-dom';
import NoteDescription from '../NoteDescription/NoteDescription';
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';

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
          <Link className="App__button" to="/note">
            Add note
          </Link>
        </div>
      </ErrorBoundary>
    );
  }
}

Folder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Folder;
