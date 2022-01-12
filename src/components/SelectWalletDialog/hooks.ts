import { useCallback } from 'react';
import { SelectWalletDialogProps } from './types';
import { useEthereumWallet } from '../EthereumProvider/hooks';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const useSelectWalletDialog = ({ open, onClose }: SelectWalletDialogProps) => {
    const { selectEthereumWallet } = useEthereumWallet();
    const { visible, setVisible } = useWalletModal();

    const handleEthereum = useCallback(() => {
        onClose();
        selectEthereumWallet();
    }, [onClose, selectEthereumWallet]);

    const handleSolana = useCallback(() => {
        onClose();
        setVisible(!visible);
    }, [onClose, setVisible, visible]);

    return {
        open, handleEthereum, handleSolana, onClose
    };
};