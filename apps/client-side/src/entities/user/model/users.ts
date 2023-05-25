import { User, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

export const module = {
	namespaced: true,

	state: (): IEntityState<User> => ({
		list: [],
		listLoading: false
	}),

	mutations: {
		setList: (s: IEntityState<User>, payload: IResponseProcessing<User[]>): User[] => (s.list = payload.data),
		setListLoading: (s: IEntityState<User>, loading: boolean): boolean => (s.listLoading = loading)
	},

	actions: {
		async getUserListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.users.getAllUsers())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения пользователей')
			} finally {
				commit('setListLoading', false)
			}
		}
	},

	getters: {
		useList: (s: IEntityState<User>) => s.list,

		useSearchedList: (s: IEntityState<User>) => (e: { query: string }) =>
			s.list.filter((u: User) => u['username'].toLowerCase().startsWith(e.query.toLowerCase())),

		isListLoading: (s: IEntityState<User>) => s.listLoading
	}
}

export const NAMESPACE = RESOURCE['users']

export const actions = {
	getUserListAsync: handlerPrefix['without'](NAMESPACE, 'getUserListAsync')
}

export const getters = {
	useList: handlerPrefix['without'](NAMESPACE, 'useList'),

	useSearchedList: handlerPrefix['without'](NAMESPACE, 'useSearchedList'),

	isListLoading: handlerPrefix['without'](NAMESPACE, 'isListLoading')
}
