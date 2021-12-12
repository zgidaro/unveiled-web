import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authentication.state";
import { tokenSelector } from '../../selectors/authentication.selector';

export const useToolbar = () => {
    const token = useSelector(tokenSelector);
    const showDashboard = !!token && window.location.pathname === "/home";
    const showGetStarted = !token && window.location.pathname === "/home" && !showDashboard;
    const showLogout = !!token && window.location.pathname === "/";
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return {
        showDashboard, showGetStarted, showLogout, onLogout,
    };
};