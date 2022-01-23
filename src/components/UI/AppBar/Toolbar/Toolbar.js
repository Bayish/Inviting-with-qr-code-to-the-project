import React, {useState} from 'react';
import NavigationItems from "../NavigationItems/NavigationItems";
import {Link} from "react-router-dom";
import c from './Toolbar.module.css';

const Toolbar = () => {
  const [open] = useState(false);

  return (
    <header>
      <div className={c.Toolbar}>
        <div className={`${c.header} container`}>
          <div className={`${c.header__logo}  ${open ? c.logoActive : c.logoNotActive}`}>
            <Link to={'/'}>
              <h5 className={c.logoText}>Logo</h5>
            </Link>
          </div>
          <nav className={c.header__links}>
            <NavigationItems/>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;