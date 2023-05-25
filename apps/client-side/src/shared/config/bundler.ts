import { getEnv } from 'shared/lib'

export const bundler: Record<string, any> = {}

// Bundler url (API)
bundler['url'] = getEnv('VITE_APP_API_URL')

// Bundler headers (API)
bundler['headers'] = { 'Content-type': 'Application/json' }
