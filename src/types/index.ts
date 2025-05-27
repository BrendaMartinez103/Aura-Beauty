// filepath: /my-nextjs-app/my-nextjs-app/src/types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}