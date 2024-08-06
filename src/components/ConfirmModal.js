import React from "react";

export const ConfirmModal = ({ title, text, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded p-6">
                <h2 className="text-xl font-bold mb-4 dark:text-white">{title}</h2>
                <p className="mb-4 dark:text-white w-[260px]">{text}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};