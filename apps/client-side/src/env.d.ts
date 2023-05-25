interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_TITLE: string
	readonly VITE_APP_IS_DEV: boolean
	readonly VITE_APP_IS_PROD: boolean

	readonly VITE_APP_API_URL: string
	readonly VITE_APP_API_RESOURSE_AUTH: string
	readonly VITE_APP_API_RESOURCE_USERS: string
	readonly VITE_APP_API_RESOURCE_FACILITIES: string
	readonly VITE_API_RESOURCE_FACILITY_TYPES: string
	readonly VITE_API_RESOURCE_EVENTS: string
	readonly VITE_API_RESOURCE_PROPERTIES: string
	readonly VITE_API_RESOURCE_SCRIPTS: string
	readonly VITE_API_RESOURCE_OPTIONS: string

	readonly VITE_APP_MAP_API: string
	readonly VITE_APP_MAP_VER: string
	readonly VITE_APP_MAP_LANG: string
	readonly VITE_APP_MAP_COORDORDER: string
	readonly VITE_APP_MAP_DEBUG: boolean
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
