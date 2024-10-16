<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected $appends = [
        'images',
    ];

    public function platformUser()
    {
        return $this->belongsTo(PlatformUser::class);
    }

    protected function images(): Attribute
    {
        return Attribute::make(
            get: fn () => null,
        );
    }
}
