<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform_user_id',
        'title',
        'content',
    ];

    public function platformUser()
    {
        return $this->belongsTo(PlatformUser::class);
    }
}
