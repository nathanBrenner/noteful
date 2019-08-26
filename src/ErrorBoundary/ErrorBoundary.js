import React, { Component } from 'react';

export default class CurrencyError extends Component {
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
