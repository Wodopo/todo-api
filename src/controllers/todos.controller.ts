import type { Request, ResponseToolkit } from 'hapi';
import { TodosService } from '../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTodos = async (request: Request, h: ResponseToolkit) => {

    const filter = request.query.filter as 'ALL' | 'COMPLETE' | 'INCOMPLETE';
    const orderBy = request.query.orderBy as 'CREATED_AT' | 'COMPLETED_AT' | 'DESCRIPTION';

    return await TodosService.getTodos(filter, orderBy);
};

type postPayload = { description: string }
export const postTodos = async (request: Request, h: ResponseToolkit) => {

    const description = (request.payload as postPayload).description;
    const newTodo = await TodosService.postTodos(description);
    return h.response(newTodo).code(201);
};

type patchPayload = { state?: 'COMPLETE' | 'INCOMPLETE', description?: string }
export const patchTodos = async (request: Request, h: ResponseToolkit) => {

    const id = request.params.id;
    const payload = request.payload as patchPayload;
    const state = payload.state;
    const description = payload.description;

    // (state === 'COMPLETE' && description) is handled by Joi

    if (state !== 'INCOMPLETE' && description) {
        const todo = await TodosService.getTodo(id);
        if (!todo) {
            return h.response({
                statusCode: 404,
                error: 'Not Found',
                message: 'Resource not found'
            }).code(404);
        }

        if (todo.state === 'COMPLETE') {
            return h.response({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid request payload input'
            }).code(400);
        }
    }

    return await TodosService.patchTodo(id, { state, description });
};

export const deleteTodos = async (request: Request, h: ResponseToolkit) => {

    const id = request.params.id;
    const result = await TodosService.deleteTodos(id);

    if (result === 0) {
        return h.response().code(404);
    }

    return h.response().code(204);
};
