import { Label, Link, PrimaryButton, TextField } from '@fluentui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from './hooks';

import './Authentication.scss';

export const Signup = () => {
    const { token, email, username, password, setEmail, setUsername, setPassword, disabled, onSignup } = useSignup();

    return token ? <Navigate to="/" /> : (
        <div className="authentication card">
            <h2>Signup</h2>
            <TextField type="email" placeholder="Email" value={email} onChange={(_, v) => setEmail(v)} />
            <TextField type="username" placeholder="Username" value={username} onChange={(_, v) => setUsername(v)} />
            <TextField type="password" placeholder="Password" value={password} onChange={(_, v) => setPassword(v)} />
            <PrimaryButton disabled={disabled} onClick={onSignup}>Sign Up</PrimaryButton>
            <Label>Already have an account? <Link href="/login">Login</Link></Label>
        </div>
    );
};
