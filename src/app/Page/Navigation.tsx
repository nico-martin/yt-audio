import React, { useState, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import './Navigation.css';

interface Props {
  className?: string;
}

const Navigation = ({ className }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`${className} navigation`}>
      <button
        className="navigation__toggle"
        aria-controls="main-navigation"
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen(!open)}
      >
        Toggle Navigation
      </button>
      <div
        className="navigation__nav"
        id="main-navigation"
        aria-hidden={open ? 'false' : 'true'}
      >
        <NavLink
          exact
          className="navigation__link"
          to="/"
          activeClassName="navigation__link--active"
        >
          Home
        </NavLink>
        {[/*'About',*/ 'Legal', 'Privacy'].map(e => (
          <NavLink
            exact
            to={`/${e.toLowerCase().replace(/\s/g, '-')}/`}
            className="navigation__link"
            activeClassName="navigation__link--active"
          >
            {e}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
