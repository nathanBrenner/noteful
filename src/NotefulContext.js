import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  postFolder: () => {},
  postNote: () => {},
});

export default NotefulContext;
