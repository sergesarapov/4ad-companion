import React from 'react';

interface UpdateNotificationProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

export const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  onUpdate,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
      <div>
        <p className="font-semibold">Update Available</p>
        <p className="text-sm text-blue-100">A new version is ready to install.</p>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={onDismiss}
          className="px-3 py-1 text-sm text-blue-200 hover:text-white transition-colors"
        >
          Later
        </button>
        <button
          onClick={onUpdate}
          className="px-3 py-1 bg-white text-blue-600 rounded font-medium hover:bg-blue-50 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
};
