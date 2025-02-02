import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons from react-icons

const ThemeToggleButton = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center p-2 ms-4 rounded-md bg-dark-blue dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <>
                    <FaMoon
                        size={20}
                        className="text-white dark:text-gray-100"
                    />
                    <span className="ml-2 text-white dark:text-gray-100">
                        Light
                    </span>
                </>
            ) : (
                <>
                    <FaSun size={20} className="text-yellow-500" />
                    <span className="ml-2 ">Dark</span>
                </>
            )}
        </button>
    );
};

export default ThemeToggleButton;
