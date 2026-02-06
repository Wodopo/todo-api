import * as Hapi from '@hapi/hapi';
import { Default, Todos } from './routes';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route([
    ...Default.routes,
    ...Todos.routes
] as Array<Hapi.ServerRoute>);

const swaggerOptions = {
    info: {
        title: 'Elecctro TODO API Documentation',
        version: '1.0.0'
    }
};

await server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
