export interface JwtUser {
    id: string;
    username: string;
}

export interface JwtCredentials {
    user: JwtUser;
}
