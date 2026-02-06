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

        queryBuilder.then((data) => {

            resolve(data as Todo[]);
        });

        queryBuilder.catch((e) => {

            reject(e);
        });
    });
};
