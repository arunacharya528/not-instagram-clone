import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HomeIcon, LogInIcon, MenuIcon } from 'lucide-react';
import React from 'react';

function Navigation() {
    return (
        <div className="flex-col-space-y-5 flex">
            <Button
                variant="ghost"
                className="gap-3 rounded-full px-4 py-6 text-lg font-semibold"
            >
                <HomeIcon /> Home
            </Button>
        </div>
    );
}

export default function BaseLayout({
    children,
}: {
    children?: React.ReactElement;
}) {
    return (
        <div className="flex h-svh flex-col overflow-clip">
            <div className="flex items-center p-5">
                <div className="flex-none space-x-2 lg:w-72 lg:space-x-0">
                    <Sheet>
                        <SheetTrigger>
                            <Button
                                variant="outline"
                                size="icon"
                                className="lg:hidden"
                            >
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
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
                        <Button>
                            <LogInIcon className="mr-2 h-4 w-4" /> Login
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex grow overflow-y-auto">
                <div className="hidden w-72 flex-none p-5 lg:block">
                    <Navigation />
                </div>
                <div className="h-full grow overflow-auto">{children}</div>
            </div>
        </div>
    );
}
