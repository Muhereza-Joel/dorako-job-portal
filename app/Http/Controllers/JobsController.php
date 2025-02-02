<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Job::with('tags')->get();
        $tags = Tag::all();

        return Inertia::render('Jobs', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'jobs' => $jobs,
            'tags' => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateJob', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tags' => 'nullable|string', // Tags as a comma-separated string
        ]);

        $validated['creator'] = Auth::id();

        $job = Job::create($validated);

        if ($request->tags) {
            $tags = explode(',', $request->tags); // Convert comma-separated string into an array
            $job->attachTags($tags); // Spatie will create tags if they don't exist
        }

        return redirect()->back()->with('success', 'Job saved successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function toggle($id)
    {
        $job = Job::findOrFail($id);
        $job->active = !$job->active;
        $job->save();

        return response()->json(['success' => true, 'active' => $job->active]);
    }
}
