/**
 * Transformed name
 * @return name
 */
export const transformedName = (name: string) => {
	name.toUpperCase().replace(/ /g, '-')
}
