import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react"; // Import Link from Inertia

export default function FilterForm({
    filtersConfig,
    className = "",
    url = "",
    display,
    filters = {}, // Receive filters from parent
}) {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters); // Update local state when filters change
    }, [filters]);

    const handleChange = (e, name) => {
        const { value, checked, type } = e.target;
        setLocalFilters((prevFilters) => {
            if (type === "checkbox") {
                return {
                    ...prevFilters,
                    [name]: checked
                        ? [...prevFilters[name], value]
                        : prevFilters[name].filter((v) => v !== value),
                };
            }

            return { display, ...prevFilters, [name]: value };
        });
    };

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {filtersConfig.map(
                ({ name, placeholder, type = "text", options }) => (
                    <div key={name} className="flex flex-row items-center">
                        <label className="font-semibold mx-3 text-gray-900 dark:text-gray-100">
                            {placeholder}
                        </label>
                        {type === "select" ? (
                            <select
                                name={name}
                                value={localFilters[name] || "all"} // Ensure a default value
                                onChange={(e) => handleChange(e, name)}
                                className="py-1 px-8 border rounded"
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : type === "checkbox" ? (
                            <div className="flex space-x-2">
                                {options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center space-x-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={localFilters[
                                                name
                                            ]?.includes(option)}
                                            onChange={(e) =>
                                                handleChange(e, name)
                                            }
                                            className="mr-1"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={localFilters[name] || ""}
                                onChange={(e) => handleChange(e, name)}
                                placeholder={placeholder}
                                className="py-1 px-5 border rounded"
                            />
                        )}
                    </div>
                )
            )}
            <Link
                href={route(url, localFilters)}
                className="py-1 px-5 bg-blue-500 text-white rounded"
            >
                Filter
            </Link>
        </div>
    );
}
