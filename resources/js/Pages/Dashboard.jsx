import Stats from "@/Components/Stats";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, permissions, users, jobs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome Back {auth.user.name}!
                        </div>
                    </div>
                    <div className="mt-2">
                        <Stats users={users} jobs={jobs} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
