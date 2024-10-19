import BaseLayout from '@/Layouts/BaseLayout';
import { Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormEventHandler } from 'react';

import { InputWrapper } from '@/components/ui/input-wrapper';
import { CheckedState } from '@radix-ui/react-checkbox';
import { LoaderCircle } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => {
                reset('password');
            },
        });
    };

    return (
        <BaseLayout>
            <div className="flex h-full w-full items-center justify-center">
                <form onSubmit={submit}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription className="text-balance">
                                Please enter your credentials to log in to 'Not
                                Instagram'
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <InputWrapper
                                    label="Email"
                                    inputFor="email"
                                    error={errors.email}
                                >
                                    <Input
                                        id="email"
                                        placeholder="Please enter email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                </InputWrapper>

                                <InputWrapper
                                    label="Password"
                                    inputFor="password"
                                    error={errors.password}
                                >
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Please enter password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                </InputWrapper>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        name="remember"
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(
                                            checked: CheckedState,
                                        ) =>
                                            setData(
                                                'remember',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {processing ? 'Logging In' : 'Log In'}
                            </Button>
                            <Button type="submit" variant="outline" asChild>
                                <Link href={route('register')}>Register</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </BaseLayout>
    );
}
