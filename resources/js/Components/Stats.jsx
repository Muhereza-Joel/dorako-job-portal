import { FaUsers, FaClipboardList } from "react-icons/fa";

export default function Stats({ users, jobs }) {
    const stats = [
        {
            title: "All Users",
            value: users,
            icon: <FaUsers className="text-purple-500 text-6xl" />,
        },
        {
            title: "Jobs",
            value: jobs,
            icon: <FaClipboardList className="text-red-500 text-6xl" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center"
                >
                    <div className="mr-4">{stat.icon}</div>
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value || 0}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
