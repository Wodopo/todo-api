import * as Hapi from '@hapi/hapi';
import { Default, Todos, Auth } from './routes';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Jwt from '@hapi/jwt';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route([
        ...Default.routes,
        ...Todos.routes,
        ...Auth.routes
    ] as Array<Hapi.ServerRoute>);

    const swaggerOptions: HapiSwagger.RegisterOptions = {
        documentationPath: '/docs',
        info: {
            title: 'Elecctro TODO API Documentation',
            version: '1.0.0'
        },
        grouping: 'tags'
    };

    await server.register([
        Jwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET || 'your-secret-key',
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 3600 // 1hr
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate: (artifacts, request, h) => {

            const user = artifacts.decoded.payload.user;

            // TODO check if the user exists in the db / is valid;

            return {
                isValid: user !== undefined && user !== null,
                credentials: { user }
            };
        }
    });

    server.ext('onPreAuth', (request, h) => {

        const token = request.state?.token;
        if (token) {
            request.headers.authorization = `Bearer ${token}`;
        }

        return h.continue;
    });

    server.auth.default('jwt');
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
