import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';

export const Home = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const createNewDungeon = () => {
        const slug = Math.random().toString(36).substring(2, 10); // Generate a random slug
        navigate(`/dungeon/${slug}`);
    };

    const handleLoadDungeon = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const slugMatch = file.name.match(/^4ad-(.+?)-backup/);
        if (!slugMatch) {
            alert(
                'Could not determine dungeon slug from file name.\n' +
                    'Please make sure the file is named like: 4ad-<slug>-backup.json'
            );
            return;
        }
        const slug = slugMatch[1];

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                Object.entries(data).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });
                navigate(`/dungeon/${slug}`);
            } catch {
                alert('Invalid file format.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="h-[80vh] grid place-items-center">
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={createNewDungeon}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Delve into a new dungeon
                </button>
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Load existing dungeon
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleLoadDungeon}
                        ref={fileInputRef}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};
