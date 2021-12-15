import { createContext } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

interface EthereumWalletContextProps {

}

const defaultValue: EthereumWalletContextProps = {

};

export const EthereumWalletContext = createContext(defaultValue);