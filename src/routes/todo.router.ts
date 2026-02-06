import { TodosController } from '../controllers';

const basePath = '/todos';

export const routes = [
    {
        method: 'GET', path: basePath, handler: TodosController.getTodos
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
