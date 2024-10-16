import { Card } from '@/components/Post/Card';
import BaseLayout from '@/Layouts/BaseLayout';
import { Post } from '@/types/models';

export default function Welcome({ posts }: { posts: Post[] }) {
    return (
        <BaseLayout>
            <div className="mx-auto md:w-2/3 lg:w-1/2">
                {posts.map((post, index) => (
                    <Card post={post} key={index} />
                ))}
            </div>
        </BaseLayout>
    );
}
