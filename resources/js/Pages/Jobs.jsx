import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaArrowRight, FaTag } from "react-icons/fa"; // Arrow icon
import { useState } from "react";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify"; // React toastify

export default function Jobs({ auth, permissions, jobs, tags, currentTag }) {
    const { can } = usePermission(permissions);
    const [jobStates, setJobStates] = useState(
        jobs.reduce((acc, job) => {
            acc[job.id] = job.active;
            return acc;
        }, {})
    );

    // Ensure CSRF token is included in Axios requests
    axios.defaults.headers.common["X-CSRF-TOKEN"] = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    // Format the date as "4th, October 2024 at 3:00 PM"
    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const d = new Date(date);
        return d.toLocaleString("en-GB", options);
    };

    // Toggle active status and update the backend
    const toggleActiveStatus = async (id) => {
        const updatedStatus = !jobStates[id];

        console.log(`Toggling job ${id} to ${updatedStatus}`); // Debugging

        try {
            await axios.patch(route("jobs.toggle", id), {
                active: updatedStatus,
            });

            setJobStates((prevState) => ({
                ...prevState,
                [id]: updatedStatus,
            }));

            toast.success(
                `Job ${
                    updatedStatus
                        ? "application enabled"
                        : "application disabled"
                }!`
            );
        } catch (error) {
            console.error("Error updating job status:", error);
            toast.error("Failed to update job status.");
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        <div className="flex items-center">
                            Showing All Jobs
                            {currentTag && (
                                <div className="ml-8 mt-2 flex items-center space-x-2">
                                    <FaTag className="text-blue-600 dark:text-blue-400" />{" "}
                                    {/* Tag icon */}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Tagged With:
                                    </span>
                                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                        {currentTag.name.en}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </h2>

                    <div className="flex">
                        {can("Create Job") && (
                            <Link
                                href={route("jobs.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Add New Job
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Jobs" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col md:flex-row gap-2">
                    {/* Jobs List */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-3 text-gray-900 dark:text-gray-100">
                                <h3 className="text-lg font-semibold">
                                    Jobs List
                                </h3>
                                <div className="grid grid-cols-1 gap-4 mt-4">
                                    {jobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4"
                                        >
                                            <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                                {job.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                Posted On:{" "}
                                                {formatDate(job.created_at)}
                                            </p>

                                            {/* Job-Specific Tags */}
                                            {Array.isArray(job.tags) &&
                                                job.tags.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {job.tags.map(
                                                            (tag, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={route(
                                                                        "jobs-tagged",
                                                                        tag.slug
                                                                            .en
                                                                    )} // Pass the correct slug, assuming it is a string
                                                                    className="text-xs bg-blue-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md"
                                                                >
                                                                    {
                                                                        tag.name
                                                                            .en
                                                                    }
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                            <div className="flex items-center justify-between mt-4">
                                                <Link
                                                    href={route(
                                                        "jobs.show",
                                                        job.id
                                                    )}
                                                    className="inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300"
                                                >
                                                    Read More
                                                    <FaArrowRight className="ml-2" />
                                                </Link>

                                                <div className="flex items-center">
                                                    <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                                                        Applications{" "}
                                                        {job.active === 1
                                                            ? "Enabled"
                                                            : "Disabled"}
                                                    </label>

                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    jobStates[
                                                                        job.id
                                                                    ]
                                                                }
                                                                onChange={() =>
                                                                    toggleActiveStatus(
                                                                        job.id
                                                                    )
                                                                }
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* General Tags Section */}
                    <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            All Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={route("jobs-tagged", tag.slug.en)} // Pass the correct slug, assuming it is a string
                                    className="text-xs bg-gray-200 dark:bg-gray-100 text-gray-800 dark:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-300"
                                >
                                    {tag.name.en}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <style jsx>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 20px;
                    z-index: 0;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 50px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 12px;
                    width: 12px;
                    border-radius: 50px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                }

                input:checked + .slider {
                    background-color: #4caf50;
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
