import { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { useJWT } from '@graphql-yoga/plugin-jwt';
import { useResponseCache } from '@graphql-yoga/plugin-response-cache';
import jwt from 'jsonwebtoken';
import { schema } from './schema';

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

const decodeToken = (headers: IncomingHttpHeaders): jwt.JwtPayload | null => {
  if (headers.authorization) {
    const token = headers.authorization.split(' ')[1];
    const tokenPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return tokenPayload;
  }

  return null;
};

export const yoga = createYoga({
  schema,
  context: async ({ request }: { request: IncomingMessage }) => {
    const token = decodeToken(request.headers);
    const user = token ? { ...token, id: token.sub } : undefined;
    const userId = user?.id;

    return { request, user, userId };
  },
  plugins: [
    useJWT({
      issuer: `${process.env.SUPABASE_URL}/auth/v1`,
      signingKey: JWT_SECRET,
      audience: 'authenticated',
      algorithms: ['HS256'],
    }),
    useResponseCache({
      // cache based on the authentication header
      session: request => request.headers.get('authentication'),
      ttl: 5_000,
    }),
  ],
});
