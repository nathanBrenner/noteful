import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>props.errorMessage</h2>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  errorMessage: PropTypes.string,
  children: PropTypes.node,
};
