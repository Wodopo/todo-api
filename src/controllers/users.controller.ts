import type { Request, ResponseToolkit } from 'hapi';
import { UsersService } from '../services';
import { PatchUser } from '../models/user.model';
import type { JwtCredentials } from '../models/jwt.model';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMe = async (request: Request, h: ResponseToolkit) => {

    const userId = (request.auth.credentials as JwtCredentials).user.id;
    return await UsersService.getUser(userId);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const patchMe = async (request: Request, h: ResponseToolkit) => {

    const userId = (request.auth.credentials as JwtCredentials).user.id;
    const payload = request.payload as PatchUser;

    return await UsersService.patchUser(userId, payload);
};
