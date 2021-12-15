import { DialogType } from "@fluentui/react";

export const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
};
export const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Choose Wallet Type',
};

export interface SelectWalletDialogProps {
    open: boolean;
    onClose: () => void;
}