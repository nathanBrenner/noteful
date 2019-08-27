import React from 'react';
import FolderLink from '../FolderLink/FolderLink';
import './Sidebar.css';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';

function findFolder(noteId, context) {
  if (!noteId) {
    return '';
  }
  const folderId = ((context.notes || []).find(note => note.id === noteId) || {}).folderId;
  const folder = (context.folders || []).find(f => f.id === folderId);
  return (folder || {}).name;
}

class Sidebar extends React.Component {
  static defaultProps = {
    folders: [],
  };
  static contextType = NotefulContext;

  render() {
    return (
      <ErrorBoundary errorMessage={'Unable to show folders'}>
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
                <Link className="App__button" to="/folder">
                  Add folder
                </Link>
              </div>
            </>
          )}

          {this.props.match && this.props.match.path === '/note/:id' && (
            <>
              <button
                className="App__button"
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
      </ErrorBoundary>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }),
};

Sidebar.defaultProps = {
  match: {
    params: {},
    path: '',
  },
};

export default Sidebar;
