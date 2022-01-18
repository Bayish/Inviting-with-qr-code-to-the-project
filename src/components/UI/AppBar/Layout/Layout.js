import React from 'react';
import Toolbar from "../Toolbar/Toolbar";
import c from './Layout.module.css';


const Layout = ({children}) => {
    return (
        <>
          <div>
            <Toolbar/>
            <main className={c.LayoutContent}>
              {children}
            </main>
          </div>
        </>
    );
};

export default Layout;