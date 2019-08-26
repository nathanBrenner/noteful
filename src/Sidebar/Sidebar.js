import React from 'react';
import FolderLink from '../FolderLink/FolderLink';
import './Sidebar.css';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
function findFolder(noteId, context) {
  if (!noteId) {
    return '';
  }
  const folderId = context.notes.find(note => note.id === noteId).folderId;
  const folder = context.folders.find(f => f.id === folderId);
  return folder.name;
}

class Sidebar extends React.Component {
  static defaultProps = {
    folders: [],
  };
  static contextType = NotefulContext;

  render() {
    return (
      <div>
        {(!this.props.match || this.props.match.path !== '/note/:id') && (
          <>
            <ul className="Sidebar">
              {this.context.folders.map(folder => (
                <li key={folder.id}>
                  <FolderLink folder={folder} />
                </li>
              ))}
            </ul>
            <div className="Sidebar-actions">
              <Link className="Sidebar-add" to="/folder">
                Add folder
              </Link>
            </div>
          </>
        )}

        {this.props.match && this.props.match.path === '/note/:id' && (
          <>
            <button
              className="Sidebar-add"
              onClick={() => this.props.history.goBack()}
            >
              Go back
            </button>
            <h2 className="Sidebar-folderName">
              {findFolder(this.props.match.params.id, this.context)}
            </h2>
          </>
        )}
      </div>
    );
  }
}

export default Sidebar;
