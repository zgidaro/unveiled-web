import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { tokenSelector } from '../selectors/authentication.selector';

interface PrivateRouteProps {
    children: React.ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = useSelector(tokenSelector);
    return !token ? <Navigate to="/home" /> : children;
};
