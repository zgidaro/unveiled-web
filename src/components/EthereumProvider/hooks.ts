import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWallet } from "../../redux/authentication.state";
import { injectedConnector } from './types';

export const useEthereumWallet = () => {
    const { active, account, activate, deactivate } = useWeb3React();

    const dispatch = useDispatch();

    const selectEthereumWallet = useCallback(async () => {
        try {
            await activate(injectedConnector);
        }
        catch { }
    }, [activate]);

    useEffect(() => {
        if (!account || !active) return;

        addWallet(account, "ethereum")(dispatch);
        deactivate();
    }, [account, active, dispatch, deactivate]);

    return { selectEthereumWallet };
};