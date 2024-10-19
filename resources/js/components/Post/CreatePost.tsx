import { useForm } from '@inertiajs/react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { InputWrapper } from '../ui/input-wrapper';
import { Textarea } from '../ui/textarea';

export function CreatePost({ trigger }: { trigger: React.ReactElement }) {
    const [modalIsOpen, toggleModalState] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                toggleModalState(false);
                toast('Successfully posted');
            },
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <Dialog open={modalIsOpen} onOpenChange={toggleModalState}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <InputWrapper inputFor="title" error={errors.title}>
                            <Textarea
                                id="title"
                                placeholder="Write whats on your mind"
                                value={data.title}
                                rows={3}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                        </InputWrapper>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {processing ? 'Posting' : 'Post'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
