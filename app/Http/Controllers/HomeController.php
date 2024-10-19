<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $posts = Post::with('platformUser.user')->withCount('likes')->latest()->get();

        return Inertia::render('Home', compact('posts'));
    }
}
