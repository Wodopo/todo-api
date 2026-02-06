import type { Request, ResponseToolkit } from 'hapi';
import { TodosService } from '../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTodos = async (request: Request, h: ResponseToolkit) => {

    const filter = request.query.filter as 'ALL' | 'COMPLETE' | 'INCOMPLETE';
    const orderBy = request.query.orderBy as 'CREATED_AT' | 'COMPLETED_AT' | 'DESCRIPTION';

    return await TodosService.getTodos(filter, orderBy);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const postTodos = (request: Request, h: ResponseToolkit) => {

    return 'Hello World!';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const patchTodos = (request: Request, h: ResponseToolkit) => {

    return 'Hello World!';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteTodos = (request: Request, h: ResponseToolkit) => {

    return 'Hello World!';
};
