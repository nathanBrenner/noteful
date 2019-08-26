import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Main from './Main/Main';
import Folder from './Folder/Folder';
import Note from './Note/Note';
import Sidebar from './Sidebar/Sidebar';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import './App.css';
import fetchHandler from './fetchHandler';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  componentDidMount() {
    Promise.all([fetchHandler.folder.get(), fetchHandler.note.get()])
      .then(([folders, notes]) => {
        this.setState({ notes, folders });
      })
      .catch(error => this.setState({ error }));
  }

  deleteNote = id => {
    this.setState(state => ({ notes: state.notes.filter(n => n.id !== id) }));
  };

  postFolder = folder => {
    this.setState(state => ({ folders: [...state.folders, folder] }));
  };

  postNote = note => {
    this.setState(state => ({ notes: [...state.notes, note] }));
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      postFolder: this.postFolder,
      postNote: this.postNote,
    };
    const exactRoutes = ['/', '/note', '/folder'];
    return (
      <NotefulContext.Provider value={contextValue}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <Link to="/">Noteful</Link>
            </header>
            <main className="App-main">
              {['/', '/folder', '/note', '/folder/:id', '/note/:id'].map(
                path => (
                  <Route
                    path={path}
                    exact={exactRoutes.includes(path)}
                    component={props => <Sidebar {...props} />}
                    key={path}
                  />
                )
              )}
              <div className="App-routes">
                <Route path="/" exact component={Main} />
                <Route path="/folder" exact component={AddFolder} />
                <Route path="/folder/:id" component={Folder} />
                <Route path="/note" exact component={AddNote} />
                <Route path="/note/:id" component={Note} />
              </div>
            </main>
          </div>
        </BrowserRouter>
      </NotefulContext.Provider>
    );
  }
}

export default App;
