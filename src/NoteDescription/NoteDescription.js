import React from 'react';
import { Link } from 'react-router-dom';
import './NoteDescription.css';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
import fetchHandler from '../fetchHandler';
import PropTypes from 'prop-types';

function deleteNote(id, cb, history) {
  fetchHandler.note
    .delete(id)
    .then(() => {
      history.push('/');
      cb(id);
    })
    .catch(console.error);
}

const monthMap = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const NoteDescription = ({ note, history }) => {
  const modifiedDate = new Date(note.modified);
  return (
    <NotefulContext.Consumer>
      {context => (
        <div className="NoteDescription">
          <Link to={`/note/${note.id}`} className="NoteDescription-name">
            {note.name}
          </Link>
          <div className="NoteDescription-date">{`Date modified on ${modifiedDate.getDate()} ${
            monthMap[modifiedDate.getMonth()]
          } ${modifiedDate.getFullYear()}`}</div>
          <button
            className="App__button NoteDescription-delete"
            onClick={() => deleteNote(note.id, context.deleteNote, history)}
          >
            Delete Note
          </button>
        </div>
      )}
    </NotefulContext.Consumer>
  );
};

NoteDescription.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(NoteDescription);
