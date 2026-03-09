import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="mb-6">
                <p className="text-gray-700">{message}</p>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant="danger" onClick={() => {
                    onConfirm();
                    onClose();
                }}>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
};
