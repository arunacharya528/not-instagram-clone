import { Post } from '@/types/models';
import { formatDistanceToNow } from 'date-fns';
import { Bookmark, EllipsisVertical, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { CreateComment } from './CreateComment';
import { LikePost } from './LikePost';
import { ListComments } from './ListComments';

export function Card({ post }: { post: Post }) {
    return (
        <div className="">
            <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold">
                        {post.platform_user?.user?.name}
                    </span>
                </div>

                <div className="flex space-x-2">
                    <EllipsisVertical />
                </div>
            </div>

            {Boolean(post.images?.length) &&
                (post.images?.length === 1 ? (
                    <img
                        src={post.images[0]}
                        alt={`${post.title} image`}
                        className="h-96 w-full object-cover"
                    />
                ) : (
                    <Carousel>
                        <CarouselContent>
                            {post.images?.map((image, index) => (
                                <CarouselItem key={index} className="pl-0">
                                    <img
                                        src={image}
                                        alt={`${post.title} image ${index}`}
                                        className="h-96 w-full object-cover"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                ))}

            {!post.images?.length && (
                <div className="space-y-1 px-2 font-semibold">
                    <div className="text-sm">{post.title}</div>
                    <div className="text-xs">{post.content}</div>
                </div>
            )}

            <div className="px-2 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                        <LikePost post={post} />

                        <CreateComment post={post} />

                        <Send className="size-7" />
                    </div>

                    <div>
                        <Bookmark className="size-7" />
                    </div>
                </div>
                {Boolean(post.images?.length) && (
                    <div className="space-y-1 py-2 font-semibold">
                        <div className="text-sm">{post.title}</div>
                        <div className="text-xs">{post.content}</div>
                    </div>
                )}
                <div className="space-y-1 py-3 font-semibold">
                    <div className="text-sm">{post.likes_count} likes</div>

                    {Boolean(post.comments_count) && (
                        <ListComments post={post}>
                            <>
                                {/* {Boolean(post.comments_count) > 0 ? ( */}
                                <div className="text-xs text-gray-500">
                                    View All {post.comments_count} comments
                                </div>
                                {/* ) : (
                                ''
                            )} */}
                            </>
                        </ListComments>
                    )}

                    <div className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(post.created_at), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
