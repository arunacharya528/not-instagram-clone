import { Post } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { LoaderCircle, MessageCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { InputWrapper } from '../ui/input-wrapper';
import { Textarea } from '../ui/textarea';
import { CondensedCard } from './CondensedCard';

export function CreateComment({ post: post_content }: { post: Post }) {
    const [dialogIsOpen, toggleDialogState] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        return_url: window.location.href,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('posts.comments.store', [post_content.id]), {
            onSuccess: () => {
                reset();
                toggleDialogState(false);
                toast('Successfully commented');
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={dialogIsOpen} onOpenChange={toggleDialogState}>
            <DialogTrigger>
                <MessageCircle className="size-7" />
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                        <DialogDescription>
                            <CondensedCard post={post_content} />
                            <div className="grid gap-4 py-4">
                                <InputWrapper
                                    inputFor="content"
                                    error={errors.content}
                                >
                                    <Textarea
                                        id="content"
                                        placeholder="Write your comment"
                                        value={data.content}
                                        rows={3}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                    />
                                </InputWrapper>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {processing ? 'Commenting' : 'Comment'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
