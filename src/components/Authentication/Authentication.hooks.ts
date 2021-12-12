import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/authentication.state";
import { AuthenticationService } from '../../services/AuthenticationService';
import { tokenSelector } from '../../selectors/authentication.selector';

export const useLogin = () => {
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const token = useSelector(tokenSelector);

    const dispatch = useDispatch();

    const disabled = !username || !password;

    const onLogin = useCallback(async () => {
        const service = new AuthenticationService();
        if (disabled) {
            return;
        }
        const token = await service.login(username, password);
        if (token) {
            dispatch(setToken(token));
        }
        else {
            // error
        }
    }, [username, password, disabled, dispatch]);

    return {
        token, username, password, setUsername, setPassword, disabled, onLogin
    };
};

export const useSignup = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const token = useSelector(tokenSelector);

    const dispatch = useDispatch();

    const disabled = !email || !username || !password;

    const onSignup = useCallback(async () => {
        const service = new AuthenticationService();
        if (disabled) {
            return;
        }
        const token = await service.signup(email, username, password);
        if (token) {
            dispatch(setToken(token));
        }
        else {
            // error
        }
    }, [email, username, password, disabled, dispatch]);

    return {
        token, email, username, password, setEmail, setUsername, setPassword, disabled, onSignup
    };
};