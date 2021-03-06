import React from 'react';
import { Link, PrimaryButton } from '@fluentui/react';
import { UnveiledLogo } from '../Icons/UnveiledLogo';
import { useToolbar } from './hooks';

import './Toolbar.scss';

const Toolbar = () => {
    const { showToolbar, showDashboard, showGetStarted, showLogout, onLogout } = useToolbar();

    return !showToolbar ? null : (
        <header className="toolbar">
            <Link href="/home"><UnveiledLogo size={24} fill="rgb(12, 5, 109)" /></Link>
            {showGetStarted ? <PrimaryButton href="/signup">Get Started</PrimaryButton> : null}
            {showDashboard ? <PrimaryButton href="/">Dashboard</PrimaryButton> : null}
            {showLogout ? <PrimaryButton onClick={onLogout}>Logout</PrimaryButton> : null}
        </header>
    );
};

export const withToolbar = (Component: React.ComponentType) => {
    return (
        <>
            <Toolbar />
            <Component />
        </>
    );
}
