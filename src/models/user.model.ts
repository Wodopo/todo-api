export interface User {
    id: string,
    username: string,
    name: string,
    email: string,
    password_hash: string,
    registered_at: Date,
    last_updated_at: Date,
}

export type PublicUser = Omit<User, 'password_hash'>;

export type PatchUser = Partial<Omit<User, 'id' | 'username' | 'registered_at' | 'last_updated_at' | 'password_hash'>> & { password?: string };

