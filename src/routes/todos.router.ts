import Joi from 'joi';
import { TodosController } from '../controllers';

const basePath = '/todos';

export const routes = [
    {
        method: 'GET',
        path: basePath,
        handler: TodosController.getTodos,
        options: {
            validate: {
                query: Joi.object({
                    filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE').default('ALL'),
                    orderBy: Joi.string().valid('CREATED_AT', 'COMPLETED_AT', 'DESCRIPTION').default('CREATED_AT')
                })
            }
        }
    },
    {
        method: 'POST', path: basePath, handler: TodosController.postTodos
    },
    {
        method: 'PATCH', path: `${basePath}/{id}`, handler: TodosController.patchTodos
    },
    {
        method: 'DELETE', path: `${basePath}/{id}`, handler: TodosController.deleteTodos
    }
];
