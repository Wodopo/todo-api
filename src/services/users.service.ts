import { pg } from '../db';
import * as Password from '../auth/password';

import type { User, PublicUser, PatchUser } from '../models/user.model';


export const getPublicUser = (user: User): PublicUser => {

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password_hash, ...rest } = user;
    return rest;
};

export const getUser = async (id: string) => {

    return await new Promise<PublicUser>((resolve, reject) => {

        const queryBuilder = pg('users')
            .where({ id })
            .returning('*')
            .first();

        queryBuilder
            .then((user) => resolve(getPublicUser(user as unknown as User)))
            .catch((e) => reject(e));
    });
};


type PatchUserWithPasswordHash = Omit<PatchUser, 'password'> & { password_hash: string }
export const patchUser = async (id: string, updates: PatchUser) => {

    const { password, ...rest } = updates;

    if (password) {
        (rest as PatchUserWithPasswordHash).password_hash = Password.hash(password);
    }

    return await new Promise<PublicUser>((resolve, reject) => {

        const queryBuilder = pg('users')
            .where({ id })
            .update(rest)
            .returning('*');

        queryBuilder
            .then((users) => resolve(getPublicUser(users[0] as User)))
            .catch((e) => reject(e));
    });
};
