import { app } from 'app'

type Toast = {
	severity: 'success' | 'error' | 'warn' | 'info'
	summary?: string
	detail: any
	life?: number
	closable?: boolean
}

/**
 * Get toast message
 * @param toast
 * @param lifeTime
 */
const getToastMessage = (toast: Toast, lifeTime = toast.severity === 'success' ? 1000 : 3000) => {
	app.config.globalProperties.$toast.add({
		...toast,
		closable: false,
		life: lifeTime
	})
}

/**
 * Toast handler
 */
export const handlerToast = {
	/**
	 * View success toast
	 */
	success: (title: string | undefined, body: any, lifeTime?: number) => {
		getToastMessage({ severity: 'success', summary: title, detail: body }, lifeTime)
	},

	/**
	 * View info toast
	 */
	info: (title: string | undefined, body: any, lifeTime?: number) => {
		getToastMessage({ severity: 'info', summary: title, detail: body }, lifeTime)
	},

	/**
	 * View warning toast
	 */
	warn: (title: string | undefined, body: any, lifeTime?: number) => {
		getToastMessage({ severity: 'warn', summary: title, detail: body }, lifeTime)
	},

	/**
	 * View error toast
	 */
	error: (title: string | undefined, body: any, lifeTime?: number) => {
		getToastMessage({ severity: 'error', summary: title, detail: body }, lifeTime)
	}
}
