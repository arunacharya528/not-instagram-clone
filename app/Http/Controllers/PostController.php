<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;

class PostController extends Controller
{
    public function store(StorePostRequest $request)
    {
        $title = str($request->title)->substr(0, 255);
        $content = str($request->title)->substr(255, strlen($request->title));
        $platform_user_id = request()->user()->platformUser->id;

        $post = Post::create(compact('title', 'content', 'platform_user_id'));

        return redirect()->route('home');
    }
}
