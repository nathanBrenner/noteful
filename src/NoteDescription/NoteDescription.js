import React from 'react';
import { Link } from 'react-router-dom';
import './NoteDescription.css';
import NotefulContext from '../NotefulContext';
import { withRouter } from 'react-router-dom';
function deleteNote(id, cb, history) {
  fetch(`http://localhost:9090/notes/${id}`, {
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(() => {
      history.push('/');
      cb(id);
    })
    .catch(console.error);
}

const NoteDescription = ({ note, history }) => {
  const modifiedDate = new Date(note.modified);
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
            className="NoteDescription-delete"
            onClick={() => deleteNote(note.id, context.deleteNote, history)}
          >
            Delete Note
          </button>
        </div>
      )}
    </NotefulContext.Consumer>
  );
};

export default withRouter(NoteDescription);
