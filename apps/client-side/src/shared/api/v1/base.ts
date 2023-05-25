import axios, { AxiosError, AxiosInstance } from 'axios'

import { bundler } from 'shared/config'
import { handlerCookie } from 'shared/lib'

import { authModel } from 'features/auth'

import { store } from 'app/providers'

const apiInstance: AxiosInstance = axios.create({
	baseURL: bundler['url'],
	headers: bundler['headers']
})

apiInstance.interceptors.request.use(
	config => {
		const token = handlerCookie.get('token')
		const { headers } = config

		headers['Authorization'] = `X-Auth-Token ${token || ''}`

		return config
	},
	(error: AxiosError) => Promise.reject(error)
)

apiInstance.interceptors.response.use(
	response => response,
	error => {
		if (error.response.data.status === 403) {
			if (error.response.data.message === 'Доступ запрещен') {
				store.dispatch(authModel.actions['onRefreshTokenAsync'])
			} else console.error(error)
		} else console.error(error)

		return Promise.reject(error)
	}
)

export default apiInstance
