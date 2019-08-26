import React from 'react';

export default function ValidationError(props) {
  if (props.message && props.isVisible) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}
