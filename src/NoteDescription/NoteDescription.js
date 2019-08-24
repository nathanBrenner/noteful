import React from 'react';
import { Link } from 'react-router-dom';
import './NoteDescription.css';

const NoteDescription = ({ note }) => {
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
    <div className="NoteDescription">
      <Link to={`/note/${note.id}`} className="NoteDescription-name">
        {note.name}
      </Link>
      <div className="NoteDescription-date">{`Date modified on ${modifiedDate.getDate()} ${
        monthMap[modifiedDate.getMonth()]
      } ${modifiedDate.getFullYear()}`}</div>
      <button className="NoteDescription-delete">Delete Note</button>
    </div>
  );
};

export default NoteDescription;
