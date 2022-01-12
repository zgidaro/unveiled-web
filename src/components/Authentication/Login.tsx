import { Label, Link, PrimaryButton, TextField } from '@fluentui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from './hooks';

import './Authentication.scss';

export const Login = () => {
    const { token, username, password, setUsername, setPassword, disabled, onLogin } = useLogin();

    return token ? <Navigate to="/" /> : (
        <div className="authentication card">
            <h2>Login</h2>
            <TextField type="username" placeholder="Username" value={username} onChange={(_, v) => setUsername(v)} />
            <TextField type="password" placeholder="Password" value={password} onChange={(_, v) => setPassword(v)} />
            <PrimaryButton disabled={disabled} onClick={onLogin}>Login</PrimaryButton>
            <Label>Don't have an account? <Link href="/signup">Sign Up</Link></Label>
        </div>
    );
};
