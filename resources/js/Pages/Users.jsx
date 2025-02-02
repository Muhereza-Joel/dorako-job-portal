import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePermission } from "@/Hooks/usePermissions";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FilterForm from "@/Components/FilterForm";
import ViewToggle from "@/Components/ViewToggle";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Users({ auth, permissions, users }) {
    const { can } = usePermission(permissions);
    const { data, setData } = useForm({});
    const [viewMode, setViewMode] = useState("table");

    // Initialize filters on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const filters = {};
        filters.account_status = urlParams.get("account_status");
        filters.role = urlParams.get("role");
        setData(filters);
        setViewMode(urlParams.get("display") || "table");
    }, [setData]);

    const filtersConfig = [
        {
            name: "account_status",
            placeholder: "Filter By Status",
            type: "select",
            options: ["active", "suspended"],
            defaultValue: "active",
        },
        {
            name: "role",
            placeholder: "Filter By Role",
            type: "select",
            options: ["all", "admin", "job creator", "job seeker"],
            defaultValue: "all",
        },
    ];

    const renderTableView = () => (
        <div className="overflow-x-auto mx-2">
            <table className="w-full mt-4 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700">
                <thead>
                    <tr className="text-gray-800 dark:text-gray-100">
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            SNo
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Username
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Email
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Role
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Account Status
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`text-gray-800 dark:text-gray-100 ${
                                index % 2 === 0
                                    ? "bg-white dark:bg-gray-900"
                                    : "bg-blue-gray-50/50 dark:bg-gray-800"
                            }`}
                        >
                            <td className="p-2 border-b dark:border-gray-700">
                                {index + 1}
                            </td>
                            <td className="p-2 border-b dark:border-gray-700">
                                {user.name}
                            </td>
                            <td className="p-2 border-b dark:border-gray-700">
                                {user.email}
                            </td>
                            <td className="p-2 border-b dark:border-gray-700">
                                {user.roles.length > 0
                                    ? user.roles
                                          .map((role) => role.name)
                                          .join(", ")
                                    : "No Roles"}
                            </td>
                            <td className="p-2 border-b dark:border-gray-700">
                                {user.account_status}
                            </td>
                            <td className="p-2 border-b dark:border-gray-700">
                                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    <option value="">Select Action</option>
                                    <option value="view">View</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderGridView = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-neutral dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex justify-center mb-4">
                        {/* Placeholder SVG for users without an image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            {!user.image ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-20 h-12 text-gray-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 12c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z"></path>
                                </svg>
                            ) : (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <h3 className="font-semibold text-md text-gray-900 dark:text-gray-100">
                        Username: {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Email: {user.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Role:{" "}
                        {user.roles.length > 0
                            ? user.roles.map((role) => role.name).join(", ")
                            : "No Roles"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Account Status: {user.account_status}
                    </p>
                    <PrimaryButton className="w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        View Details
                    </PrimaryButton>
                </div>
            ))}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>

                    <div className="flex">
                        <FilterForm
                            filtersConfig={filtersConfig}
                            className="mr-10"
                            url="users.index"
                            display={viewMode}
                            filters={data} // Pass current filter state to the form
                        />
                        <ViewToggle
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            className="mr-8"
                        />
                        {can("Create User") && (
                            <Link
                                href={route("users.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Add User
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-x-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0">
                    {viewMode === "table"
                        ? renderTableView()
                        : renderGridView()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
