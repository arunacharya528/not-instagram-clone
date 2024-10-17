import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { CircleUserRound, HomeIcon, LogInIcon, MenuIcon } from 'lucide-react';
import React from 'react';

function Navigation() {
    return (
        <div className="flex-col-space-y-5 flex">
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
        <div className="flex h-svh flex-col overflow-clip">
            <div className="flex items-center p-5">
                <div className="flex-none space-x-2 lg:w-72 lg:space-x-0">
                    <Sheet aria-describedby="Navigation sidebar for mobile">
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="lg:hidden"
                            >
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" content="navigation sidebar">
                            <Navigation />
                        </SheetContent>
                    </Sheet>
                    <span className="font-satisfy text-xl md:text-3xl">
                        Not Instagram
                    </span>
                </div>
                <div className="inline-flex grow items-center">
                    <div className="w-1/2 justify-start"></div>
                    <div className="hidden flex-shrink grow lg:block">
                        <Input
                            type="email"
                            placeholder="Search"
                            className="w-64"
                        />
                    </div>

                    <div className="flex w-1/2 justify-end">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button>
                                        <CircleUserRound className="mr-2 h-4 w-4" />
                                        {auth.user.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href={route('profile.edit')}>
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
            <div className="flex grow overflow-y-auto">
                <div className="hidden w-72 flex-none p-5 lg:block">
                    <Navigation />
                </div>
                <div className="h-full grow overflow-auto">
                    <div className="mx-auto h-full md:w-2/3 lg:w-1/2">
                        {Boolean(title) && (
                            <h2 className="sticky top-0 z-10 bg-white px-2 py-5 text-2xl font-semibold tracking-tight ring-2 ring-white transition-colors first:mt-0">
                                {title}
                            </h2>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
