import React from 'react';
import NoteDescription from '../NoteDescription/NoteDescription';
import './Note.css';
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';

class Note extends React.Component {
  static contextType = NotefulContext;

  render() {
    const note = this.context.notes.find(
      ({ id }) => id === this.props.match.params.id
    ) || {};
    return (
      <ErrorBoundary errorMessage={'Unable to show this note'}>
        <div>
          <NoteDescription note={note} />
          <p className="Note-content">{note.content}</p>
        </div>
      </ErrorBoundary>
    );
  }
}

Note.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};



export default Note;
