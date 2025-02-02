<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function renderDashboard()
    {

        return Inertia::render(
            'Dashboard',
            [
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            ]
        );
    }
}
