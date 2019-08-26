import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
  if (props.message && props.isVisible) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}

ValidationError.propTypes = {
  message: PropTypes.string,
  isVisible: PropTypes.bool,
};

ValidationError.deafaultProps = {
  message: '',
  isVisible: false,
};
