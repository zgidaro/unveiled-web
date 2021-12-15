import React from 'react';
import { createTheme, ThemeProvider } from '@fluentui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home/Home';
import { Signup } from './Authentication/Signup';
import { Toolbar } from './Toolbar/Toolbar';
import { Login } from './Authentication/Login';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { WalletContexts } from './WalletContexts/WalletContexts';
import { Profile } from './Profile/Profile';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import reducers from '../redux/reducers';

import palette from '../theme.json';
import './Unveiled.scss';

const unveiledTheme = createTheme({ palette });

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

initializeIcons();

export const Unveiled = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={unveiledTheme} className="unveiled">
                <Toolbar />
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<PrivateRoute><WalletContexts /></PrivateRoute>} />
                        <Route path="/:username" element={<Profile />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};
