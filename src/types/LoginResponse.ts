export interface User{
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    isVerified: boolean;
    avatar?: {
        url: string;
        filename: string;
        path: string;
        width: number;
        height: number;
        isExternal: boolean;
    };
}
export interface LoginResponse {
  token: string;
  user: User;
}