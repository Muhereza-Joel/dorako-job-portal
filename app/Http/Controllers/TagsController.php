<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function showJobsTagged(string $slug)
    {

        $tag = Tag::where('slug->en', $slug)->firstOrFail();

        // Get all jobs associated with this tag
        $jobs = Job::with('tags')
            ->whereHas('tags', function ($query) use ($slug) {
                $query->where('slug->en', $slug);
            })
            ->get();

        $tags = Tag::all();

        return Inertia::render('Jobs', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'jobs' => $jobs,
            'tags' => $tags,
            'currentTag' => $tag,
        ]);
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
}
