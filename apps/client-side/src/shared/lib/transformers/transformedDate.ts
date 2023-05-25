const localDate = new Date()

const date = {
	day: localDate.getDate().toString().padStart(2, '0'),
	month: localDate.getMonth().toString().padStart(2, '0'),
	year: localDate.getFullYear().toString().slice(-2)
}

/**
 * Transformed date
 * @return date
 */
export const transformedDate = `${date['day']}.${date['month']}.${date['year']}`
