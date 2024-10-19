import { Comment, Post } from '@/types/models';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { formatDistanceToNow } from 'date-fns';
import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function CommentCard({ comment }: { comment: Comment }) {
    return (
        <div className="flex space-x-3">
            <Avatar className="flex-none">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex grow flex-col space-y-2 text-sm">
                <div className="space-x-2">
                    <span className="font-semibold">
                        {comment.platform_user?.user?.name}
                    </span>
                    <span className="text-gray-500">
                        {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                        })}
                    </span>
                </div>
                <div className="">{comment.content}</div>
            </div>
        </div>
    );
}

function Comments({ post }: { post: Post }) {
    const [isLoading, toggleLoadingState] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        toggleLoadingState(true);
        fetch(route('posts.comments.index', [post.id]))
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .finally(() => {
                toggleLoadingState(false);
            });
    }, [post.id]);

    return (
        <>
            {isLoading && <LoaderCircleIcon className="size-10 animate-spin" />}

            <div className="flex flex-col space-y-7">
                {comments.map((comment, index) => (
                    <CommentCard comment={comment} key={index} />
                ))}
            </div>

            {!comments.length && !isLoading && <div>No Comments yet</div>}
        </>
    );
}

export function ListComments({
    post,
    children,
}: {
    post: Post;
    children: React.ReactElement;
}) {
    const [drawerIsOpen, toggleDrawerStatus] = useState(false);

    return (
        <Drawer open={drawerIsOpen} onOpenChange={toggleDrawerStatus}>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="max-h-[90vh] min-h-96">
                <div className="mx-auto w-full overflow-y-auto lg:w-1/3">
                    <DrawerHeader className="px-2">
                        <DrawerTitle>Comments</DrawerTitle>
                        <DrawerDescription>
                            What others had to say about this post
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-2">
                        {drawerIsOpen && <Comments post={post} />}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
