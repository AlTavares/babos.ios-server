import React from 'react';
import Nav from '../nav';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css'

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <div id="main" className="container-fluid">
                <main id="content">{children}</main>
            </div>
        </div>
    );
}

Layout.displayName = 'Layout';


