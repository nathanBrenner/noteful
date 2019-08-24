import React from 'react';
import FolderLink from '../FolderLink/FolderLink';
import './Sidebar.css';
import store from '../dummy-store';

function findFolder(noteId) {
  if (!noteId) {
    return '';
  }
  const folderId = store.notes.find(note => note.id === noteId).folderId;
  const folder = store.folders.find(f => f.id === folderId);
  return folder.name;
}

const Sidebar = ({ folders, match, history }) => {
  folders = folders || [];
  match = match || {};
  return (
    <div>
      {(!match || match.path !== '/note/:id') && (
        <>
          <ul className="Sidebar">
            {folders.map(folder => (
              <li key={folder.id}>
                <FolderLink folder={folder} />
              </li>
            ))}
          </ul>
          <div className="Sidebar-actions">
            <button className="Sidebar-add">Add folder</button>
          </div>
        </>
      )}

      {match && match.path === '/note/:id' && (
        <>
          <button className="Sidebar-add" onClick={() => history.goBack()}>
            Go back
          </button>
          <h2 className="Sidebar-folderName">{findFolder(match.params.id)}</h2>
        </>
      )}
    </div>
  );
};

export default Sidebar;
