import { pg } from '../db';

interface Todo {
    id: string,
    state: string,
    description: string,
    created_at: Date,
    completed_at: Date | null,
    user_id: string
}

export const getTodos = async (userId: string, filter: 'ALL' | 'COMPLETE' | 'INCOMPLETE', orderBy: 'DESCRIPTION' | 'CREATED_AT' | 'COMPLETED_AT') => {

    return await new Promise<Todo[]>((resolve, reject) => {

        const queryBuilder = pg('todos').where({ user_id: userId });

        if (filter === 'COMPLETE' || filter === 'INCOMPLETE') {
            queryBuilder.where({ state: filter });
        }

        switch (orderBy) {
            case 'DESCRIPTION': queryBuilder.orderBy('description', 'asc'); break;
            case 'COMPLETED_AT': queryBuilder.orderBy('completed_at', 'asc'); break;
            default: queryBuilder.orderBy('created_at', 'asc'); break;
        }

        queryBuilder.then((data) => resolve(data as Todo[]))
            .catch((e) => reject(e));
    });
};

export const getTodo = async (userId: string, id: string) => {

    return await new Promise<Todo | null>((resolve, reject) => {

        const queryBuilder = pg('todos').where({ id, user_id: userId }).returning([
            'id',
            'state',
            'description',
            'created_at',
            'completed_at'
        ]).first();

        queryBuilder.then((todo) => {

            const result = todo as Todo | null;
            resolve(result);
        }).catch((e) => reject(e));
    });
};

export const postTodo = async (userId: string, description: string) => {

    return await new Promise<Todo>((resolve, reject) => {

        const queryBuilder = pg('todos')
            .insert({ description, user_id: userId })
            .returning([
                'id',
                'state',
                'description',
                'created_at',
                'completed_at',
                'user_id'
            ]);

        queryBuilder
            .then((todos) => resolve(todos[0]))
            .catch((e) => reject(e));
    });
};

type patchContent = { state?: 'COMPLETE' | 'INCOMPLETE', description?: string }
export const patchTodo = async (userId: string, id: string, content: patchContent) => {

    // TODO: completedAt could be updated via a pg trigger on 'state' change
    const completed_at = content.state === 'COMPLETE' ? new Date() : null;

    return await new Promise<Todo>((resolve, reject) => {

        const queryBuilder = pg('todos')
            .where({ id, user_id: userId })
            .update({ ...content, completed_at }, [
                'id',
                'state',
                'description',
                'created_at',
                'completed_at'
            ]);

        queryBuilder
            .then((todos) => resolve(todos[0] as Todo))
            .catch((e) => reject(e));
    });
};

export const deleteTodo = async (userId: string, id: string) => {

    return await new Promise<number>((resolve, reject) => {

        const queryBuilder = pg('todos');

        queryBuilder.delete().where({ id, user_id: userId });

        queryBuilder
            .then((deleteCount) => {

                if (typeof deleteCount === 'number') {
                    resolve(deleteCount);
                }
            })
            .catch((e) => reject(e));
    });
};
