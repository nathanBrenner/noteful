import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Main from './Main/Main';
import Folder from './Folder/Folder';
import Note from './Note/Note';
import './App.css';
import dummyStore from './dummy-store';
import Sidebar from './Sidebar/Sidebar';

class App extends React.Component {
  state = {
    notes: dummyStore.notes,
    folders: dummyStore.folders,
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to="/">Noteful</Link>
          </header>
          <main className="App-main">
            <Route
              exact
              path="/"
              component={() => <Sidebar folders={this.state.folders} />}
            />
            <Route
              path="/folder/:id"
              component={() => <Sidebar folders={this.state.folders} />}
            />
            <Route
              path="/note/:id"
              component={props => (
                <Sidebar folders={this.state.folders} {...props} />
              )}
            />
            <div className="App-routes">
              <Route
                path="/"
                exact
                component={() => <Main notes={this.state.notes} />}
              />
              <Route
                path="/folder/:id"
                component={Folder}
                notes={this.state.notes}
              />
              <Route
                path="/note/:id"
                component={Note}
                notes={this.state.notes}
              />
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
