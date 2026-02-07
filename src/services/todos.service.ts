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

export const getTodo = async (id: string) => {

    return await new Promise<Todo | null>((resolve, reject) => {

        const queryBuilder = pg('todos').where({ id }).returning([
            'id',
            'state',
            'description',
            'createdat',
            'completedat'
        ]).first();

        queryBuilder.then((todo) => {

            const result = todo as Todo | null;
            resolve(result);
        }).catch((e) => reject(e));
    });
};

export const postTodo = async (description: string) => {

    return await new Promise<Todo>((resolve, reject) => {

        const queryBuilder = pg('todos')
            .insert({ description })
            .returning([
                'id',
                'state',
                'description',
                'createdat',
                'completedat'
            ]);

        queryBuilder.then((todos) => resolve(todos[0]))
            .catch((e) => reject(e));
    });
};

type patchContent = { state?: 'COMPLETE' | 'INCOMPLETE', description?: string }
export const patchTodo = async (id: string, content: patchContent) => {

    // TODO: completedAt could be updated via a pg trigger on 'state' change
    const completedat = content.state === 'COMPLETE' ? new Date() : null;

    return await new Promise<Todo>((resolve, reject) => {

        const queryBuilder = pg('todos')
            .where({ id })
            .update({ ...content, completedat }, [
                'id',
                'state',
                'description',
                'createdat',
                'completedat'
            ]);

        queryBuilder.then((todos) => resolve(todos[0] as Todo))
            .catch((e) => reject(e));
    });
};

export const deleteTodo = async (id: string) => {

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
