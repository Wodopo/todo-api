import type { Request, ResponseToolkit } from 'hapi';
import { AuthService } from '../services';

type LoginPayload = {
    username: string;
    password: string;
}

export const login = async (request: Request, h: ResponseToolkit) => {

    const { username, password } = request.payload as LoginPayload;
    const token = await AuthService.login(username, password);

    if (!token) {
        return h.response({ error: 'Invalid credentials' }).code(401);
    }

    return h.response().state('token', token);
};

export const logout = (request: Request, h: ResponseToolkit) => {

    return h.response().unstate('token').code(204);
};


type RegisterPayload = {
    username: string;
    password: string;
    name: string;
    email: string;
}

export const register = async (request: Request, h: ResponseToolkit) => {

    const { username, password, name, email } = request.payload as RegisterPayload;

    try {
        const token = await AuthService.register(username, password, name, email);
        return h.response().state('token', token!).code(201);
    }
    catch {
        return h.response({ error: 'Registration failed' }).code(400);
    }
};
