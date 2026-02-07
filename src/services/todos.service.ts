import { pg } from '../db';

interface Todo {
    id: string,
    state: string,
    description: string,
    createdat: Date,
    completedat: Date | null
}

export const getTodos = async (filter: 'ALL' | 'COMPLETE' | 'INCOMPLETE', orderBy: 'DESCRIPTION' | 'CREATED_AT' | 'COMPLETED_AT') => {

    return await new Promise<Todo[]>((resolve, reject) => {

        const queryBuilder = pg('todos');

        if (filter === 'COMPLETE' || filter === 'INCOMPLETE') {
            queryBuilder.where({ state: filter });
        }

        switch (orderBy) {
            case 'DESCRIPTION': queryBuilder.orderBy('description', 'asc'); break;
            case 'COMPLETED_AT': queryBuilder.orderBy('completedat', 'asc'); break;
            default: queryBuilder.orderBy('createdat', 'asc'); break;
        }

        queryBuilder.then((data) => resolve(data as Todo[]))
            .catch((e) => reject(e));
    });
};

export const postTodos = async (description: string) => {

    return await new Promise<void>((resolve, reject) => {

        const queryBuilder = pg('todos');

        queryBuilder.insert({ description });

        queryBuilder.then(() => resolve())
            .catch((e) => reject(e));
    });
};

export const deleteTodos = async (id: string) => {

    return await new Promise<number>((resolve, reject) => {

        const queryBuilder = pg('todos');

        queryBuilder.delete().where({ id });

        queryBuilder.then((deleteCount) => {

            if (typeof deleteCount === 'number') {
                resolve(deleteCount);
            }
        }).catch((e) => reject(e));
    });
};
