export interface AuthData {
    user: UserData;
    token: string
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    email_verified: boolean;
    is_editor: boolean;
}