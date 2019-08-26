import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from '../NotefulContext';
import fetchHandler from '../fetchHandler';

export default class AddNote extends Component {
  state = {
    name: {
      value: '',
      touched: false,
    },
    content: {
      value: '',
      touched: false,
    },
    folder: {
      value: '',
      touched: false,
    },
  };

  handleSubmit = (event, context) => {
    event.preventDefault();
    fetchHandler.note
      .post({
        name: this.state.name.value,
        content: this.state.content.value,
        folderId: context.folders.find(
          folder => folder.name === this.state.folder.value
        ).id,
        modified: new Date().toISOString(),
      })
      .then(res => {
        this.props.history.push('/');
        context.postNote(res);
      });
  };

  updateInput(value, input) {
    this.setState({ [input]: { value, touched: true } });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return { message: 'Name is required', isValid: false };
    }
    return { message: '', isValid: true };
  }

  validateFolder(folders) {
    const folderName = folders.map(({ name }) => name);
    const folder = this.state.folder.value;
    if (!folderName.includes(folder) && this.state.folder.touched) {
      return { message: 'Folder is required', isValid: false };
    }
    return { message: '', isValid: true };
  }

  render() {
    return (
      <NotefulContext.Consumer>
        {context => (
          <form
            className="AddNote"
            onSubmit={e => this.handleSubmit(e, context)}
          >
            <h2>Add Note</h2>
            <div className="AddNote__form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="AddFolder__name-input"
                onChange={e => this.updateInput(e.target.value, 'name')}
              />
              <ValidationError
                message={this.validateName().message}
                isVisible={this.state.name.touched}
              />
            </div>
            <div className="AddNote__form-group">
              <label htmlFor="folder">Folder</label>
              <select
                onChange={e => this.updateInput(e.target.value, 'folder')}
                onBlur={e => this.updateInput(e.target.value, 'folder')}
              >
                <option></option>
                {context.folders.map(({ name, id }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ValidationError
                message={this.validateFolder(context.folders).message}
                isVisible={this.state.name.touched}
              />
            </div>

            <div className="AddNote__form-group">
              <label htmlFor="Content">Content</label>
              <textarea
                onChange={e => this.updateInput(e.target.value, 'content')}
              />
            </div>

            <div>
              <button type="button" onClick={() => this.props.history.goBack()}>
                cancel
              </button>
              <button
                type="submit"
                disabled={
                  !this.validateName().isValid ||
                  !this.validateFolder(context.folders).isValid
                }
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </NotefulContext.Consumer>
    );
  }
}
