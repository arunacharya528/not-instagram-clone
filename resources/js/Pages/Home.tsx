import { Card } from '@/components/Post/Card';
import { Post } from '@/types/models';

export default function Welcome({ posts }: { posts: Post[] }) {
    return (
        <div className="mx-auto w-1/3">
            {posts.map((post, index) => (
                <Card post={post} key={index} />
            ))}
        </div>
    );
}
