<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'platform_user_id',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function platformUser()
    {
        return $this->belongsTo(PlatformUser::class);
    }
}
