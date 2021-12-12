import JwtDecode from 'jwt-decode';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthenticationService } from '../services/AuthenticationService';
import { Wallet, UserService } from '../services/UserService';

export interface Token {
    user_id: string;
    username: string;
    email: string;
}

export interface AuthenticationState {
    token?: Token;
    wallets: Wallet[];
}

const initialToken = localStorage.getItem('currentUser');
const initialState: AuthenticationState = {
    token: initialToken ? JwtDecode<Token>(initialToken) : undefined,
    wallets: [],
};

const setTokenReducer = (state: AuthenticationState, action: PayloadAction<string | undefined>) => {
    const token = action.payload;
    if (token) {
        state.token = token ? JwtDecode<Token>(token) : undefined;
        AuthenticationService.saveToken(token);
        localStorage.setItem("currentUser", token);
    }
    else {
        state.token = undefined;
    }
}

const logoutReducer = (state: AuthenticationState, _: PayloadAction) => {
    state.token = undefined;
    AuthenticationService.clearToken();
    localStorage.removeItem('currentUser');
}

const setWalletsReducer = (state: AuthenticationState, action: PayloadAction<Wallet[]>) => {
    state.wallets = action.payload;
}

const addWalletReducer = (state: AuthenticationState, action: PayloadAction<Wallet>) => {
    state.wallets.push(action.payload);
}

const { reducer, actions } = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setToken: setTokenReducer,
        logout: logoutReducer,
        setWallets: setWalletsReducer,
        addWallet: addWalletReducer,
    },
});

export { reducer as AuthenticationReducer };
export const { setToken, logout, addWallet } = actions;

export const loadWallets = () => {
    return (async (dispatch: any) => {
        const service = new UserService();
        const res = await service.getWallets();
        dispatch(actions.setWallets(res ?? []));
    });
};