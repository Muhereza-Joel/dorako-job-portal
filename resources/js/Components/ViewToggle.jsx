import { FaThList, FaTh } from "react-icons/fa";

export default function ViewToggle({ viewMode, setViewMode, className = "" }) {
    return (
        <div className={`flex space-x-2 ${className}`}>
            <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md ${
                    viewMode === "table"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                <FaThList size={14} className="text-xl" />
            </button>
            <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                    viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                <FaTh size={14} className="text-xl" />
            </button>
        </div>
    );
}
