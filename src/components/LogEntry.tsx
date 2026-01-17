import React, { useState } from 'react';
import { LogEntryType } from '../types';

interface LogEntryProps {
  entry: LogEntryType;
  updateEntry: (entry: LogEntryType) => void;
  deleteEntry: (id: number) => void;
}

export const LogEntry: React.FC<LogEntryProps> = ({ entry, updateEntry, deleteEntry }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(entry.text);

  const handleSave = (): void => {
    updateEntry({ ...entry, text: editedText });
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setEditedText(entry.text);
    setIsEditing(false);
  };

  return (
    <div className="dark:bg-gray-800 dark:text-slate-400 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {isEditing ? (
        <>
          <textarea
            className="dark:bg-gray-800 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="dark:text-white text-gray-700 text-base">{entry.text}</p>
          <p className="dark:text-slate-400 text-gray-500 text-sm mt-2">
            {new Date(entry.timestamp).toLocaleString()}
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => deleteEntry(entry.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
