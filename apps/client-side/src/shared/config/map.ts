import { getEnv } from 'shared/lib'

export const MAP_OPTIONS: Record<string, string> = {}

// Map apiKey
MAP_OPTIONS['apiKey'] = getEnv('VITE_APP_MAP_API')

// Map coordorder
MAP_OPTIONS['coordorder'] = getEnv('VITE_APP_MAP_COORDORDER')

// Map debug
MAP_OPTIONS['debug'] = getEnv('VITE_APP_MAP_DEBUG')

// Map lan
MAP_OPTIONS['lang'] = getEnv('VITE_APP_MAP_LANG')

// Map version
MAP_OPTIONS['version'] = getEnv('VITE_APP_MAP_VER')
