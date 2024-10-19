<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CommentPostController extends Controller
{
    public function index(Post $post)
    {
        return $post->comments()->with('platformUser.user')->latest()->get();
    }

    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => ['required', 'string'],
            'return_url' => ['required', 'url'],
        ]);

        $post->comments()->create([
            'platform_user_id' => request()->user()->platformUser->id,
            'content' => $request->get('content'),
        ]);

        return redirect($request->return_url);
    }
}
