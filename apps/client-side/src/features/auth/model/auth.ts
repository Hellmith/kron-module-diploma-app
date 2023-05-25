import { RouteLocationRaw } from 'vue-router'

import { ICredentialsResponse, ITokenResponse, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerCookie, handlerError, handlerPrefix } from 'shared/lib'

import { router } from 'app/providers'

interface IAuthenticateState extends ICredentialsResponse {
	authLoading: boolean
}

export const module = {
	namespaced: true,

	state: (): IAuthenticateState => ({
		token: handlerCookie['get']('token'),
		authorities: handlerCookie['get']('authorities'),
		authLoading: false
	}),

	mutations: {
		authenticate: (_s: IAuthenticateState, payload: { data: ICredentialsResponse }): void => {
			handlerCookie['set']('token', payload.data.token, 1)
			handlerCookie['set']('authorities', payload.data.authorities, 1)
			router.push({ path: router.currentRoute.value.query.redirect || '/' } as RouteLocationRaw)
		},

		refresh: (_s: IAuthenticateState, payload: { data: ITokenResponse }) => handlerCookie['set']('token', payload.data.token, 1),

		logout: (_s: IAuthenticateState): void => {
			handlerCookie['set']('token', '', -1)
			handlerCookie['set']('authorities', '', -1)
			router.push({ name: 'auth' })
		},

		setLoading: (s: IAuthenticateState, payload: boolean): void => {
			s.authLoading = payload
		}
	},

	actions: {
		async onAuthenticateAsync({ commit }: ICommit, { params }: v1Api.authentication.ICredentialsParams): Promise<void> {
			commit('setLoading', true)
			try {
				commit(
					'authenticate',
					await v1Api.authentication.Authenticate({
						params
					})
				)
			} catch (error: unknown) {
				handlerError(error, 'Ошибка авторизации')
			} finally {
				commit('setLoading', false)
			}
		},

		async onRefreshTokenAsync({ commit }: ICommit): Promise<void> {
			try {
				commit('refresh', await v1Api.authentication.RefreshToken())
			} catch (error: unknown) {
				handlerError(error, 'Доступ запрещен')
			}
		},

		onLogout({ commit }: ICommit): void {
			try {
				commit('logout')
			} catch (error: unknown) {
				handlerError(error, 'Ошибка выхода')
			}
		}
	},

	getters: {
		useToken: (s: IAuthenticateState) => s.token,

		useAuthorities: (s: IAuthenticateState) => s.authorities,

		isAuthLoading: (s: IAuthenticateState) => s.authLoading
	}
}

export const NAMESPACE = RESOURCE['auth']

export const actions = {
	onAuthenticateAsync: handlerPrefix['without'](NAMESPACE, 'onAuthenticateAsync'),

	onRefreshTokenAsync: handlerPrefix['without'](NAMESPACE, 'onRefreshTokenAsync'),

	onLogout: handlerPrefix['without'](NAMESPACE, 'onLogout')
}

export const getters = {
	useToken: handlerPrefix['without'](NAMESPACE, 'useToken'),

	useAuthorities: handlerPrefix['without'](NAMESPACE, 'useAuthorities'),

	isAuthLoading: handlerPrefix['without'](NAMESPACE, 'isLoading')
}
