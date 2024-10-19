import { Post } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'sonner';

export function LikePost({ post: content }: { post: Post }) {
    const [isLiked, setLike] = useState(content.is_liked_by_me);

    const {
        post,
        delete: destroy,
        processing,
    } = useForm({
        return_url: window.location.href,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isLiked) {
            destroy(route('posts.like.delete', [content.id]), {
                onSuccess: () => {
                    setLike(false);
                },
                onError: () => {
                    toast(
                        'An error occurred when disliking this post. Please try again later.',
                    );
                },
            });
        }

        if (!isLiked) {
            post(route('posts.like.store', [content.id]), {
                onSuccess: () => {
                    setLike(true);
                },
                onError: () => {
                    toast(
                        'An error occurred when liking this post. Please try again later.',
                    );
                },
            });
        }
    };

    return (
        <button onClick={submit}>
            {processing ? (
                <LoaderCircle className="size-7 animate-spin" />
            ) : isLiked ? (
                <FaHeart className="size-7 text-red-500" />
            ) : (
                <FaRegHeart className="size-7" />
            )}
        </button>
    );
}
