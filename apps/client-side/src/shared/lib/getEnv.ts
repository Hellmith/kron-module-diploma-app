/**
 * Get environment
 * @param key
 * @returns value
 */
export const getEnv = (key: string): string => {
	if (import.meta.env[key] == null) {
		throw new Error(`Отсутствует значение для: ${key}`)
	}
	return import.meta.env[key]
}
