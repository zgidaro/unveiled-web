import React from 'react';
import { UnveiledLogo } from '../Icons/UnveiledLogo';

import './PageNotFound.scss';

export const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <div className="not-found-container">
                <UnveiledLogo size={96} fill="rgb(12, 5, 109)" />
                <h1>The page you're looking for doesn't exist.</h1>
                <a href="/home" className="return-home">Return home</a>
            </div>
            <footer className="footer-logo">
                <a href="/home">
                    <UnveiledLogo size={28} fill="#8e8e8e" />
                </a>
            </footer>
        </div>
    );
};
