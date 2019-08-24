import React from 'react';
import { NavLink } from 'react-router-dom';
import './FolderLink.css';

const FolderLink = ({ folder: { id, name } }) => {
  return (
    <NavLink
      to={`/folder/${id}`}
      className="FooterLink"
      activeClassName="FooterLink-active"
    >
      {name}
    </NavLink>
  );
};

export default FolderLink;
