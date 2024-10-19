import { CreatePost } from '@/components/Post/CreatePost';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { CircleUserRound, HomeIcon, LogInIcon, PencilLine } from 'lucide-react';
import React from 'react';

function Logo({ className }: { className?: string }) {
    return (
        <Link
            href={route('home')}
            className={cn('mx-auto mb-5 font-satisfy text-3xl ' + className)}
        >
            Not Instagram
        </Link>
    );
}

function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="w-64 space-y-2 p-5">
            <div className="flex justify-center">
                <Logo />
            </div>

            <div>
                <Button
                    asChild
                    variant="ghost"
                    className="gap-3 rounded-full px-4 py-6 text-lg font-semibold"
                >
                    <Link href={route('home')}>
                        <HomeIcon /> Home
                    </Link>
                </Button>
            </div>

            {isLoggedIn ? (
                <CreatePost
                    trigger={
                        <Button className="w-full gap-3 rounded-full px-10 py-6 text-lg font-semibold">
                            <PencilLine /> Post
                        </Button>
                    }
                />
            ) : (
                <Button
                    className="w-full gap-3 rounded-full px-10 py-6 text-lg font-semibold"
                    asChild
                >
                    <Link href={route('login')}>
                        <PencilLine /> Login to Post
                    </Link>
                </Button>
            )}
        </div>
    );
}

function ProfileDropdown({ trigger }: { trigger: React.ReactElement }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={route('profile.edit')}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={route('logout')} method="post" as="button">
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function BottomNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="flex justify-evenly shadow-md">
            <Button asChild variant="ghost" className="rounded-none p-6">
                <Link href={route('home')}>
                    <HomeIcon />
                </Link>
            </Button>

            {isLoggedIn ? (
                <CreatePost
                    trigger={
                        <Button variant="ghost" className="rounded-none p-6">
                            <PencilLine />
                        </Button>
                    }
                />
            ) : (
                <Button variant="ghost" className="rounded-none p-6" asChild>
                    <Link href={route('login')}>
                        <PencilLine />
                    </Link>
                </Button>
            )}

            <ProfileDropdown
                trigger={
                    <Button variant="ghost" className="rounded-none p-6">
                        <CircleUserRound />
                    </Button>
                }
            />
        </div>
    );
}

export default function BaseLayout({
    children,
    title,
}: {
    children?: React.ReactElement;
    title?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <div className="inline-flex h-svh w-full grow items-center overflow-clip">
                <div className="hidden h-full w-1/2 justify-start lg:block">
                    <Navigation isLoggedIn={Boolean(auth.user)} />
                </div>
                <div className="flex h-full w-1/2 flex-none flex-shrink grow flex-col overflow-y-auto">
                    <div className="flex flex-col border-b py-5 lg:items-center lg:justify-center lg:border-none">
                        <Logo className="mx-5 mb-0 lg:hidden" />
                        <Input
                            placeholder="Search"
                            className="hidden w-64 lg:block"
                        />
                    </div>
                    {Boolean(title) && (
                        <h2 className="sticky top-0 z-10 bg-white p-5 text-2xl font-semibold tracking-tight ring-2 ring-white transition-colors first:mt-0">
                            {title}
                        </h2>
                    )}
                    <div className="grow overflow-y-auto p-1">{children}</div>
                    <div className="flex-none border-t lg:hidden">
                        <BottomNavigation isLoggedIn={Boolean(auth.user)} />
                    </div>
                </div>

                <div className="hidden h-full w-1/2 justify-end lg:flex">
                    <div className="flex justify-end p-5">
                        {auth.user ? (
                            <ProfileDropdown
                                trigger={
                                    <Button>
                                        <CircleUserRound className="mr-2 h-4 w-4" />
                                        {auth.user.name}
                                    </Button>
                                }
                            />
                        ) : (
                            <Button asChild>
                                <Link href={route('login')}>
                                    <LogInIcon className="mr-2 h-4 w-4" /> Login
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
