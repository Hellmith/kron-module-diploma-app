/* eslint-disable no-mixed-operators */

/**
 * Cookie handler
 */
export const handlerCookie = {
	/**
	 * Set cookie
	 */
	set: (name: string, value: string, days = 0): void => {
		let expires = ''

		if (days) {
			const date: Date = new Date()
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
			expires = `; expires=${date.toUTCString()}`
		}

		document.cookie = `${name}=${value || ''}${expires}; path=/`
	},

	/**
	 * Get cookie
	 */
	get: (name: string): string => {
		const nameEQ = `${name}=`
		const cookieArray: string[] = document.cookie.split(';')
		for (let i = 0; i < cookieArray.length; i++) {
			let cookie: string = cookieArray[i]
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1, cookie.length)
			}
			if (cookie.indexOf(nameEQ) === 0) {
				return cookie.substring(nameEQ.length, cookie.length)
			}
		}
		return ''
	}
}
