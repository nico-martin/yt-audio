import cn from 'classnames';
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
          end
          to="/"
          className={({ isActive }) =>
            cn('navigation__link', { ['navigation__link--active']: isActive })
          }
        >
          Home
        </NavLink>
        {[/*'About',*/ 'Legal', 'Privacy'].map(e => (
          <NavLink
            end
            to={`/${e.toLowerCase().replace(/\s/g, '-')}/`}
            className={({ isActive }) =>
              cn('navigation__link', { ['navigation__link--active']: isActive })
            }
          >
            {e}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
