import Joi from 'joi';
import { UsersController } from '../controllers';

const userModel = Joi.object({
    id: Joi.string().uuid().required().example('daee5b84-807f-4bec-815e-5f5b3a5346e1'),
    username: Joi.string().required().example('john_doe'),
    name: Joi.string().required().example('John Doe'),
    email: Joi.string().email().required().example('john.doe@example.com'),
    registered_at: Joi.date().required().example('2026-02-07T16:16:00.618Z'),
    last_updated_at: Joi.date().required().example('2026-02-07T18:54:40.503Z')
});

export const routes = [
    {
        method: 'GET',
        path: '/me',
        handler: UsersController.getMe,
        options: {
            tags: ['api', 'users'],
            validate: {},
            response: {
                schema: userModel
            }
        }
    },
    {
        method: 'PATCH',
        path: '/me',
        handler: UsersController.patchMe,
        options: {
            tags: ['api', 'users'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().email(),
                    name: Joi.string().max(255),
                    password: Joi.string()
                }).min(1)
            },
            response: {
                schema: userModel
            }
        }
    }
];
