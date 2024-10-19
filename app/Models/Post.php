<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'is_liked_by_me',
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

    protected function isLikedByMe(): Attribute
    {
        $allLikers = $this->likes()->pluck('platform_user_id');

        return Attribute::make(
            get: fn (): bool => $allLikers->contains(request()->user()?->platformUser?->id),
        );
    }

    public function likes(): HasMany
    {
        return $this->hasMany(PostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }
}
