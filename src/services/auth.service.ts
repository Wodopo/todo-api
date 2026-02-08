import { pg } from '../db';
import * as Password from '../auth/password';
import * as Jwt from '../auth/jwt';

import type { User } from '../models/user.model';

export const login = async (username: string, password: string) => {

    return await new Promise<string | null>((resolve, reject) => {

        const queryBuilder = pg('users')
            .where({ username })
            .first();

        queryBuilder
            .then((user) => {

                if (!user || !Password.verify(user.password_hash, password)) {
                    return resolve(null);
                }

                const token = Jwt.generateToken(user);
                resolve(token);

            }).catch((e) => reject(e));
    });
};

export const register = async (username: string, password: string, name: string, email: string) => {

    return await new Promise<string | null>((resolve, reject) => {

        const queryBuilder = pg('users')
            .insert({ username, password_hash: Password.hash(password), name, email })
            .returning('*');

        queryBuilder
            .then((user) => {

                console.log(user);
                const token = Jwt.generateToken(user[0] as unknown as User);
                resolve(token);

            }).catch((e) => reject(e));
    });
};
