import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputWrapper } from '@/components/ui/input-wrapper';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <BaseLayout>
            <div className="flex h-full w-full items-center justify-center">
                <form onSubmit={submit}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription className="text-balance">
                                Please enter your credentials to register to
                                'Not Instagram'
                            </CardDescription>
                        </CardHeader>
                        {/* <form onSubmit={submit}> */}
                        <CardContent className="grid w-full items-center gap-4">
                            <InputWrapper
                                label="Name"
                                inputFor="name"
                                error={errors.name}
                            >
                                <Input
                                    id="name"
                                    placeholder="Please enter name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                            </InputWrapper>
                            <InputWrapper
                                label="Email"
                                inputFor="email"
                                error={errors.email}
                            >
                                <Input
                                    type="email"
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
                                    type="password"
                                    id="password"
                                    placeholder="Please enter password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                            </InputWrapper>
                            <InputWrapper
                                label="Confirm Password"
                                inputFor="password_confirmation"
                                error={errors.password_confirmation}
                            >
                                <Input
                                    type="password"
                                    id="password_confirmation"
                                    placeholder="Please enter password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                            </InputWrapper>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {processing ? 'Registering' : 'Register'}
                            </Button>
                            <Button type="submit" variant="outline" asChild>
                                <Link href={route('login')}>Login</Link>
                            </Button>
                        </CardFooter>
                        {/* </form> */}
                    </Card>
                </form>
            </div>
        </BaseLayout>
    );
}
