import React from 'react';
import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from '@fluentui/react';
import { dialogContentProps, modelProps, SelectWalletDialogProps } from './SelectWalletDialog.types';
import { useSelectWalletDialog } from './SelectWalletDialog.hooks';

import './SelectWalletDialog.scss';

export const SelectWalletDialog = (props: SelectWalletDialogProps) => {
    const { open, onClose, handleEthereum, handleSolana } = useSelectWalletDialog(props);

    return (
        <Dialog
            hidden={!open}
            onDismiss={onClose}
            dialogContentProps={dialogContentProps}
            modalProps={modelProps}
        >
            <div className="select-wallet-dialog-content">
                <PrimaryButton onClick={handleEthereum} text="Ethereum " />
                <PrimaryButton onClick={handleSolana} text="Solana" />
            </div>
            <DialogFooter>
                <DefaultButton onClick={onClose} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
