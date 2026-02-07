import Jwt from '@hapi/jwt';

const jwtKey = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: { id: string, username: string }) => {

    const token = Jwt.token.generate(
        { user: { id: user.id, username: user.username } },
        { key: jwtKey, algorithm: 'HS256' }
    );

    return token;
};
