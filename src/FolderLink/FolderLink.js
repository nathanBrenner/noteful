import React from 'react';
import { NavLink } from 'react-router-dom';
import './FolderLink.css';
import PropTypes from 'prop-types';

const FolderLink = ({ folder: { id, name } }) => {
  return (
    <NavLink
      to={`/folder/${id}`}
      className="App__button FooterLink"
      activeClassName="FooterLink-active"
    >
      {name}
    </NavLink>
  );
};

FolderLink.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default FolderLink;
