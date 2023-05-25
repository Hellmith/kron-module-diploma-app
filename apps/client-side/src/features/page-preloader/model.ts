import { handlerPrefix } from 'shared/lib'

interface IPageState {
	loading: boolean
}

export const module = {
	namespaced: true,

	state: (): IPageState => ({
		loading: false
	}),

	mutations: {
		setLoading: (s: IPageState, payload: boolean) => (s.loading = payload)
	},

	getters: {
		isLoading: (s: IPageState) => s.loading
	}
}

export const NAMESPACE = 'page'

export const mutations = {
	setLoading: handlerPrefix['without'](NAMESPACE, 'setLoading')
}

export const getters = {
	isLoading: handlerPrefix['without'](NAMESPACE, 'isLoading')
}
