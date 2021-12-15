import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authentication.state";
import { tokenSelector } from '../../selectors/authentication.selector';

const paths = new Set(["/home", "/login", "/signup", "/"]);

export const useToolbar = () => {
    const token = useSelector(tokenSelector);
    const showToolbar = paths.has(window.location.pathname);
    const showDashboard = !!token && window.location.pathname === "/home";
    const showGetStarted = !token && window.location.pathname === "/home";
    const showLogout = !!token && window.location.pathname === "/";
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return {
        showToolbar, showDashboard, showGetStarted, showLogout, onLogout,
    };
};