import Joi from 'joi';
import { TodosController } from '../controllers';

const basePath = '/todos';

const todoModel = Joi.object({
    id: Joi.string().uuid().required().example('76cd4b45-b801-468c-9306-2c95921908c1'),
    state: Joi.string().valid('COMPLETE', 'INCOMPLETE').required().example('COMPLETE'),
    description: Joi.string().required().example('Go to McDonalds'),
    createdat: Joi.date().required().example('2026-02-07T09:25:29.230Z'),
    completedat: Joi.date().allow(null).example('2026-02-07T09:27:29.230Z')
}).label('Result');

const todosModel = Joi.array().items(todoModel).label('Result');


export const routes = [
    {
        method: 'GET',
        path: basePath,
        handler: TodosController.getTodos,
        options: {
            tags: ['api'],
            validate: {
                query: Joi.object({
                    filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE').default('ALL'),
                    orderBy: Joi.string().valid('CREATED_AT', 'COMPLETED_AT', 'DESCRIPTION').default('CREATED_AT')
                })
            },
            response: { schema: todosModel },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        400: {
                            description: 'Invalid request query input'
                        }
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: basePath,
        handler: TodosController.postTodos,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    description: Joi.string().min(1).required()
                })
            },
            response: {
                status: {
                    201: todoModel
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: {
                            description: 'Todo created',
                            schema: todoModel
                        },
                        400: {
                            description: 'Invalid payload'
                        }
                    }
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: `${basePath}/{id}`,
        handler: TodosController.patchTodos,
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid()
                }),
                payload: Joi.object({
                    state: Joi.string().valid('COMPLETE', 'INCOMPLETE'),
                    description: Joi.when('state', {
                        is: 'COMPLETE',
                        then: Joi.forbidden(),
                        otherwise: Joi.string().min(1)
                    })
                }).min(1)
            },
            response: { schema: todosModel },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Todo patched successfully'
                        },
                        404: {
                            description: 'Todo not found'
                        },
                        400: {
                            description: 'Invalid payload'
                        }
                    }
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: `${basePath}/{id}`,
        handler: TodosController.deleteTodos,
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid()
                })
            },
            response: {
                emptyStatusCode: 204
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        204: {
                            description: 'Todo deleted successfully'
                        },
                        404: {
                            description: 'Todo not found'
                        },
                        400: {
                            description: 'Invalid todo id'
                        }
                    }
                }
            }
        }
    }
];
