import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
  //FRONTEND_BASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
