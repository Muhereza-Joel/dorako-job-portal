<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Tags\Tag;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', [DashboardController::class, 'renderDashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/assign/permissions', [RoleController::class, 'assignPermissions'])->name('assign-permissions');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'updatePermissions'])->name('roles.save-assigned-permissions');
    Route::resource('/roles', RoleController::class)->middleware('role:root');
    Route::resource('/permissions', PermissionController::class)->middleware('role:root');
    Route::resource('/users', UsersController::class);
    Route::resource('/jobs', JobsController::class);
    Route::get('/tags', function (Request $request) {
        return response()->json(Tag::all()->pluck('name'));
    });
    Route::patch('/jobs/{id}/toggle', [JobsController::class, 'toggle'])->name('jobs.toggle');
    Route::resource('/category', TagsController::class);
    Route::get('jobs/tagged/{slug}', [TagsController::class, 'showJobsTagged'])->name('jobs-tagged');
});

require __DIR__ . '/auth.php';
