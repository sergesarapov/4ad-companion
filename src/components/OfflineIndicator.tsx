import React, { useState } from 'react';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOffline }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOffline) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed top-2 right-2 bg-gray-500/75 text-white px-2 py-1 rounded text-xs font-medium z-50 hover:bg-gray-600/75"
        title="You're offline - click to expand"
      >
        Offline
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-500/75 text-white text-center py-1 text-sm font-medium z-50 flex items-center justify-center">
      <span>You're offline - changes are saved locally</span>
      <button
        onClick={() => setIsMinimized(true)}
        className="absolute right-2 text-white/80 hover:text-white px-2"
        title="Minimize"
      >
        ✕
      </button>
    </div>
  );
};
