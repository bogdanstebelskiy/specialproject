import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
})

const env = envSchema.parse(process.env)

export const {
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  AUTH_SECRET,
  RESEND_API_KEY,
} = env
