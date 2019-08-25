import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Main from './Main/Main';
import Folder from './Folder/Folder';
import Note from './Note/Note';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  componentDidMount() {
    Promise.all([this.fetchFolders(), this.fetchNotes()])
      .then(([folders, notes]) => {
        this.setState({ notes, folders });
      })
      .catch(error => this.setState({ error }));
  }

  fetchFolders = () => {
    return fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  };

  fetchNotes = () => {
    return fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  };

  deleteNote = id => {
    this.setState(state => ({ notes: state.notes.filter(n => n.id !== id) }));
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <Link to="/">Noteful</Link>
            </header>
            <main className="App-main">
              <Route exact path="/" component={Sidebar} />
              <Route path="/folder/:id" component={Sidebar} />
              <Route
                path="/note/:id"
                component={props => <Sidebar {...props} />}
              />
              <div className="App-routes">
                <Route path="/" exact component={Main} />
                <Route path="/folder/:id" component={Folder} />
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
