import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    darkMode: "class",

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },

            colors: {
                primary: {
                    DEFAULT: "#1E40AF",
                    light: "#60A5FA",
                    dark: "#1E3A8A",
                },
                secondary: {
                    DEFAULT: "#64748B",
                    light: "#CBD5E1",
                },
                neutral: {
                    DEFAULT: "#F3F4F6",
                    dark: "#1E293B",
                },
                success: "#10B981",
                warning: "#F59E0B",
                danger: "#EF4444",
                info: "#3B82F6",
            },
        },
    },

    plugins: [forms],
};
