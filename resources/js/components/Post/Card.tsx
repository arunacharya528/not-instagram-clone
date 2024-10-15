import {
    Bookmark,
    EllipsisVertical,
    Heart,
    MessageCircle,
    Send,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Card() {
    return (
        <div className="">
            <div className="flex items-center justify-between px-2 py-3">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex space-x-2">
                    <EllipsisVertical />
                </div>
            </div>

            <img
                src="https://placehold.co/1200x400"
                alt="post image"
                className="h-96 w-full object-cover"
            />

            <div className="px-2 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                        <Heart className="size-7" />

                        <MessageCircle className="size-7" />

                        <Send className="size-7" />
                    </div>

                    <div>
                        <Bookmark className="size-7" />
                    </div>
                </div>
                <div className="space-y-1 py-3 font-semibold">
                    <div className="text-sm">123456 likes</div>
                    <div className="text-xs text-gray-500">
                        View All Comments
                    </div>
                    <div className="text-xs text-gray-500">2 days ago</div>
                </div>
            </div>
        </div>
    );
}
