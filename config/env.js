import { config } from "dotenv"

config({ path: `.env.${process.env.NODE_ENV || 'production'}.local` })

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } = process.env