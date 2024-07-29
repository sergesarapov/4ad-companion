import React, { useState, useEffect } from "react";

export const DarkModeToggle = () => {
    const savedTheme = localStorage.getItem("theme") === 'dark';
    const [isDarkMode, setIsDarkMode] = useState(savedTheme);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="absolute right-2 top-2 flex items-center">
            <button
                onClick={toggleDarkMode}
                className={`p-2 rounded ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                    }`}
            >
                <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                    {!isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>{isDarkMode ? "☀️" : "🌙"}
            </button>
        </div>
    );
};
