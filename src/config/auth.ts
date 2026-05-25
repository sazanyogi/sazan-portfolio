// Set these in .env.local for local dev, or in Vercel project settings for production.
// ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
export const USERNAME = process.env.ADMIN_USERNAME ?? "";
export const PASSWORD = process.env.ADMIN_PASSWORD ?? "";
export const SESSION_SECRET = process.env.SESSION_SECRET ?? "";
