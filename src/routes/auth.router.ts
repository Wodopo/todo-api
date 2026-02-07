import Joi from 'joi';
import { AuthController } from '../controllers';


export const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: AuthController.login,
        options: {
            auth: false,
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/logout',
        handler: AuthController.logout,
        options: {
            auth: false,
            tags: ['api', 'auth'],
            response: {
                emptyStatusCode: 204
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        204: {
                            description: 'Logout successful'
                        }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: AuthController.register,
        options: {
            auth: false,
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                    name: Joi.string().required()
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: {
                            description: 'User registered successfully'
                        },
                        400: {
                            description: 'Registration failed'
                        }
                    }
                }
            }
        }
    }
];
