import { getEnv } from 'shared/lib'

export const RESOURCE: Record<string, string> = {}

// Resource auth
RESOURCE['auth'] = getEnv('VITE_APP_API_RESOURSE_AUTH')

// Resource users
RESOURCE['users'] = getEnv('VITE_APP_API_RESOURCE_USERS')

// Resource facilities
RESOURCE['facilities'] = getEnv('VITE_APP_API_RESOURCE_FACILITIES')

// Resource facility-types
RESOURCE['facility-types'] = getEnv('VITE_API_RESOURCE_FACILITY_TYPES')

// Resource events
RESOURCE['events'] = getEnv('VITE_API_RESOURCE_EVENTS')

// Resource properties
RESOURCE['properties'] = getEnv('VITE_API_RESOURCE_PROPERTIES')

// Resource scripts
RESOURCE['scripts'] = getEnv('VITE_API_RESOURCE_SCRIPTS')

// Resource options
RESOURCE['options'] = getEnv('VITE_API_RESOURCE_OPTIONS')
