import { Card } from '@/components/Post/Card';
import BaseLayout from '@/Layouts/BaseLayout';
import { Post } from '@/types/models';

export default function Welcome({ posts }: { posts: Post[] }) {
    return (
        <BaseLayout>
            <div className="space-y-5">
                {posts.map((post, index) => (
                    <Card post={post} key={index} />
                ))}
            </div>
        </BaseLayout>
    );
}
