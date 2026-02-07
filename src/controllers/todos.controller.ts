import type { Request, ResponseToolkit } from 'hapi';
import { TodosService } from '../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTodos = async (request: Request, h: ResponseToolkit) => {

    const filter = request.query.filter as 'ALL' | 'COMPLETE' | 'INCOMPLETE';
    const orderBy = request.query.orderBy as 'CREATED_AT' | 'COMPLETED_AT' | 'DESCRIPTION';

    return await TodosService.getTodos(filter, orderBy);
};

export const postTodos = async (request: Request, h: ResponseToolkit) => {

    const description = request.payload.description as string;
    await TodosService.postTodos(description);
    return h.response().code(201);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const patchTodos = (request: Request, h: ResponseToolkit) => {

    return 'Hello World!';
};

export const deleteTodos = async (request: Request, h: ResponseToolkit) => {

    const id = request.params.id;
    const result = await TodosService.deleteTodos(id);

    if (result === 0) {
        return h.response().code(404);
    }

    return h.response().code(204);
};
