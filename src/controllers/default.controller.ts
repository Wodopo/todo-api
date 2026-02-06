import { Request, ResponseToolkit } from 'hapi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getIndex = (request: Request, h: ResponseToolkit) => {

    return 'Welcome to the TODOs API';
};
