import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowCircleLeft, FaInfoCircle } from "react-icons/fa";

export default function CreateJob({ auth, permissions, success, error }) {
    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        tags: "", // New field for tags
    });

    const [suggestedTags, setSuggestedTags] = useState([]); // Store fetched tags
    const [filteredTags, setFilteredTags] = useState([]); // Filtered suggestions

    // Fetch tags from API when component mounts
    useEffect(() => {
        axios.get("/tags").then((res) => {
            setSuggestedTags(res.data); // Store fetched tags
        });
    }, []);

    // Handle tag input change and filter suggestions
    const handleTagInputChange = (e) => {
        const input = e.target.value;
        setData("tags", input);

        // Show suggestions that match the input
        if (input) {
            setFilteredTags(
                suggestedTags.filter((tag) =>
                    tag.toLowerCase().includes(input.toLowerCase())
                )
            );
        } else {
            setFilteredTags([]);
        }
    };

    // Handle selecting a tag from suggestions
    const selectTag = (tag) => {
        const currentTags = data.tags
            ? data.tags.split(",").map((t) => t.trim())
            : [];
        if (!currentTags.includes(tag)) {
            setData("tags", [...currentTags, tag].join(", "));
        }
        setFilteredTags([]); // Hide suggestions
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("jobs.store"), {
            onSuccess: () => {
                reset(); // Resets all form fields

                // Clear QuillEditor content
                if (quillRef.current) {
                    quillRef.current.getEditor().setText("");
                }

                // Also reset the tag suggestions
                setFilteredTags([]);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create Job
                    </h2>

                    <div className="flex">
                        {can("View Jobs") && (
                            <Link
                                href={route("jobs.index")}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                <FaArrowCircleLeft size={20} className="mr-3" />
                                Go Back
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Create Job" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && <AlertSuccess success={success} />}
                    {error && <AlertError error={error} />}
                    <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                        {can("Create Job") && (
                            <form onSubmit={submit} className="space-y-8 p-4">
                                <div className="space-y-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Job Title"
                                        />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            autoComplete="title"
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            placeholder="Job title goes here."
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Job Description"
                                        />
                                        <QuillEditor
                                            id="description"
                                            ref={quillRef}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                height: "300px",
                                                marginBottom: "3.5em",
                                            }}
                                            placeholder="Write job description here..."
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Tags Input with Info Alert */}
                                    <div className="my-3 relative">
                                        <InputLabel
                                            htmlFor="tags"
                                            value="Tags (comma separated)"
                                        />

                                        {/* Info Alert */}
                                        <div className="flex items-start bg-blue-100 text-blue-700 p-3 rounded-lg mb-3 text-sm">
                                            <FaInfoCircle className="mr-2 mt-1" />
                                            <span>
                                                Tags help job seekers find
                                                relevant jobs more easily. Use
                                                keywords like{" "}
                                                <strong>
                                                    Plumber, Electrician, Mason
                                                </strong>{" "}
                                                to categorize your job.
                                            </span>
                                        </div>

                                        <TextInput
                                            id="tags"
                                            name="tags"
                                            value={data.tags}
                                            className="mt-1 block w-full"
                                            autoComplete="off"
                                            onChange={handleTagInputChange}
                                            placeholder="Example: Plumber, Electrician, Mason"
                                        />

                                        {/* Tag Suggestions Dropdown */}
                                        {filteredTags.length > 0 && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md">
                                                {filteredTags.map(
                                                    (tag, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() =>
                                                                selectTag(tag)
                                                            }
                                                        >
                                                            {tag}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <InputError
                                            message={errors.tags}
                                            className="mt-2"
                                        />
                                    </div>

                                    {can("Create Job") && (
                                        <div className="flex items-center justify-start">
                                            <PrimaryButton
                                                className="ms-0 mt-2 mb-3"
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
