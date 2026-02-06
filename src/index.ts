import * as Hapi from '@hapi/hapi';
import { Default, Todos } from './routes';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route([
    ...Default.routes,
    ...Todos.routes
] as Array<Hapi.ServerRoute>);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
