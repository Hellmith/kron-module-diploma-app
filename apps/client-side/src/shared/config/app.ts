import { getEnv } from 'shared/lib'

export const APP: Record<string, string> = {}

APP['title'] = getEnv('VITE_APP_TITLE')
APP['mode'] = getEnv('VITE_APP_MODE')
