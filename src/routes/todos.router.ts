import Joi from 'joi';
import { TodosController } from '../controllers';

const basePath = '/todos';

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
            }
        }
    }
];
