import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3001),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    DATABASE_URL: z
        .string()
        .min(1, 'DATABASE_URL is required')
        .refine(
            (v) => /^postgres(ql)?:\/\//.test(v),
            'DATABASE_URL must be a postgres:// or postgresql:// URL (e.g. the Supabase pooler connection string)',
        ),
    // Required only when running migrations against a pooled (pgbouncer)
    // DATABASE_URL — Prisma migrations need a direct connection.
    DIRECT_URL: z
        .string()
        .refine((v) => v === '' || /^postgres(ql)?:\/\//.test(v), 'DIRECT_URL must be a postgres URL')
        .optional(),

    JWT_SECRET: z
        .string()
        .min(32, 'JWT_SECRET must be at least 32 characters')
        .refine(
            (v) => v !== 'your-super-secret-jwt-key-change-in-production',
            'JWT_SECRET must be changed from the .env.example default'
        ),
    JWT_EXPIRES_IN: z.string().default('15m'),

    GEMINI_API_KEY: z.string().min(20, 'GEMINI_API_KEY appears invalid').optional(),

    FRONTEND_URL: z.string().url().optional(),
});

function loadEnv() {
    const parsed = EnvSchema.safeParse(process.env);
    if (!parsed.success) {
        const issues = parsed.error.issues
            .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
            .join('\n');
        console.error(`Invalid environment configuration:\n${issues}`);
        process.exit(1);
    }

    const env = parsed.data;

    if (env.NODE_ENV === 'production') {
        if (!env.FRONTEND_URL) {
            console.error('FRONTEND_URL is required in production');
            process.exit(1);
        }
        if (!env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is required in production');
            process.exit(1);
        }
    }

    return env;
}

export const env = loadEnv();
export type Env = z.infer<typeof EnvSchema>;
