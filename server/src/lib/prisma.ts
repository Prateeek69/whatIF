import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Note: 'query' log level prints SQL with parameter values — never enable it,
// even in development, because parameters can include hashed passwords,
// emails, and other PII.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

if (env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
