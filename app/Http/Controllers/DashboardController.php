<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function renderDashboard()
    {
        $users = User::count();

        $jobs = Job::count();

        return Inertia::render(
            'Dashboard',
            [
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
                'jobs' => $jobs,
                'users' => $users
            ]
        );
    }
}
