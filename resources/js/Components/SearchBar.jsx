import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition duration-200"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
        </div>
    );
};

export default SearchBar;
