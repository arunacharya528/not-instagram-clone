export interface Post {
    id: number;
    platform_user_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    platform_user?: PlatformUser;
    images?: null | string[];
}

export interface PlatformUser {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}
