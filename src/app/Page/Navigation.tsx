import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import { Link } from 'preact-router/match';

import './Navigation.css';

interface Props {
  className?: string;
}

const Navigation = ({ className }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} navigation`}>
      <button
        className="navigation__toggle"
        aria-controls="main-navigation"
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen(!open)}
      >
        Toggle Navigation
      </button>
      <nav
        className="navigation__nav"
        id="main-navigation"
        aria-hidden={open ? 'false' : 'true'}
      >
        <Link
          className="navigation__link"
          href="/"
          activeClassName="navigation__link--active"
        >
          Home
        </Link>
        {[/*'About',*/ 'Legal', 'Privacy'].map(e => (
          <Link
            href={`/${e.toLowerCase().replace(/\s/g, '-')}/`}
            className="navigation__link"
            activeClassName="navigation__link--active"
          >
            {e}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
