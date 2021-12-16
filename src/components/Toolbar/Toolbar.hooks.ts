import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { logout } from "../../redux/authentication.state";
import { tokenSelector } from '../../selectors/authentication.selector';

const paths = new Set(["/home", "/login", "/signup", "/"]);

export const useToolbar = () => {
    const token = useSelector(tokenSelector);
    const { pathname } = useLocation();
    const showToolbar = paths.has(pathname);
    const showDashboard = !!token && pathname === "/home";
    const showGetStarted = !token && pathname === "/home";
    const showLogout = !!token && pathname === "/";
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return {
        showToolbar, showDashboard, showGetStarted, showLogout, onLogout,
    };
};