import axios, { AxiosError } from 'axios'

import { handlerToast } from './handlerToast'

type ErrorResponse = {
	error?: unknown
	message?: string
}

/**
 * Get error message
 * @param error
 * @returns error
 */
const getErrorMessage = (error: AxiosError<ErrorResponse>) => {
	if (error.response?.data) {
		if ('error' in error.response.data) {
			return error.response.data.error
		}
		if ('message' in error.response.data) {
			return error.response.data.message
		}
		return error
	}
	return error.response?.statusText ?? error.toString()
}

/**
 * Error handler
 * @param error
 * @param message
 * @action handlerToast
 */
export const handlerError = <T extends AxiosError | unknown>(error: T, message = 'Произошла ошибка'): void => {
	if (axios.isAxiosError(error)) {
		handlerToast['error'](message, getErrorMessage(error))
	} else {
		handlerToast['error'](message, error)
	}
}
