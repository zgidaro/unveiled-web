import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../redux/reducers';

export const authenticationSelector = (state: RootState) => state.authentication;

export const tokenSelector = createSelector(
    authenticationSelector,
    authentication => authentication.token
);

export const walletsSelector = createSelector(
    authenticationSelector,
    authentication => authentication.wallets
);