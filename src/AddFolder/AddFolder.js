import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from '../NotefulContext';
import fetchHandler from '../fetchHandler';
import PropTypes from 'prop-types';

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

  validateName(folders = []) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return { message: 'Name is required', isValid: false };
    }
    if (folders.map(({ name }) => name).includes(name)) {
      return {
        message: 'A folder with that name already exists',
        isValid: false,
      };
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
            <h2 className="App__form-title">Add Folder</h2>
            <div className="App__form-group">
              <label htmlFor="name">
                <div>Name</div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  aria-label="folder name"
                  aria-required="true"
                  onChange={e => this.updateName(e.target.value)}
                />
                <ValidationError
                  message={this.validateName(context.folders).message}
                  isVisible={this.state.name.touched}
                />
              </label>
            </div>
            <div>
              <button
                type="button"
                className="App__button"
                onClick={() => this.props.history.goBack()}
              >
                cancel
              </button>
              <button
                type="submit"
                className="App__button"
                disabled={!this.validateName(context.folders).isValid}
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

AddFolder.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }),
};
