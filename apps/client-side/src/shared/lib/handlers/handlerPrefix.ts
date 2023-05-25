/**
 * Prefix handler
 */
export const handlerPrefix = {
	/**
	 * With prefix
	 */
	with: (namespaced: boolean, namaspace: string, name: string) => (namespaced ? `${namaspace}/${name}` : name),

	/**
	 * Without prefix
	 */
	without: (namaspace: string, name: string) => `${namaspace}/${name}`
}
