import { DefaultController } from '../controllers';

export const routes = [
    {
        method: 'GET',
        path: '/',
        handler: DefaultController.getIndex
    }
];
