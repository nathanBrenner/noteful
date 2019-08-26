import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from '../NotefulContext';
import fetchHandler from '../fetchHandler';

export default class AddFolder extends Component {
  state = {
    name: {
      value: '',
      touched: false,
    },
  };

  handleSubmit = (event, updateState) => {
    event.preventDefault();
    fetchHandler.folder.post({ name: this.state.name.value }).then(res => {
      this.props.history.push('/');
      updateState(res);
    });
  };

  updateName(value) {
    this.setState({ name: { value, touched: true } });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return { message: 'Name is required', isValid: false };
    }
    return { message: '', isValid: true };
  }

  render() {
    return (
      <NotefulContext.Consumer>
        {context => (
          <form
            className="AddFolder"
            onSubmit={e => this.handleSubmit(e, context.postFolder)}
          >
            <h2>Add Folder</h2>
            <div className="AddFolder__form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="AddFolder__name-input"
                onChange={e => this.updateName(e.target.value)}
              />
              <ValidationError
                message={this.validateName().message}
                isVisible={this.state.name.touched}
              />
            </div>
            <div>
              <button type="button" onClick={() => this.props.history.goBack()}>
                cancel
              </button>
              <button type="submit" disabled={!this.validateName().isValid}>
                Submit
              </button>
            </div>
          </form>
        )}
      </NotefulContext.Consumer>
    );
  }
}
