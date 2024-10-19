<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class LikePostController extends Controller
{
    public function store(Request $request, Post $post): Redirector|RedirectResponse
    {
        $request->validate([
            'return_url' => ['required', 'url'],
        ]);

        $post->likes()->create([
            'platform_user_id' => $request->user()->platformUser->id,
        ]);

        return redirect($request->return_url);
    }

    public function destroy(Request $request, Post $post): Redirector|RedirectResponse
    {
        $request->validate([
            'return_url' => ['required', 'url'],
        ]);

        $post->likes()->where([
            'platform_user_id' => $request->user()->platformUser->id,
        ])->delete();

        return redirect($request->return_url);
    }
}
