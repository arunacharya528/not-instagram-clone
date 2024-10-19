<?php

use App\Http\Controllers\CommentPostController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikePostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::post('/posts/{post}/like', [LikePostController::class, 'store'])->name('posts.like.store');
    Route::delete('/posts/{post}/like', [LikePostController::class, 'destroy'])->name('posts.like.delete');

    Route::get('/posts/{post}/comments', [CommentPostController::class, 'index'])->name('posts.comments.index')->withoutMiddleware('auth');
    Route::post('/posts/{post}/comments', [CommentPostController::class, 'store'])->name('posts.comments.store');
});

require __DIR__.'/auth.php';
