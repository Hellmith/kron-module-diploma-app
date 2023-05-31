import { Script, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

export const module = {
	namespaced: true,

	state: (): IEntityState<Script> => ({
		list: [],
		detail: {},
		listLoading: false,
		detailLoading: false,
		createLoading: false,
		updateLoading: false
	}),

	mutations: {
		setList: (s: IEntityState<Script>, payload: { data: Script[] }) => (s.list = payload.data),

		setDetail: (s: IEntityState<Script>, payload: { data: Script }) => (s.detail = payload.data),

		setDetailLoading: (s: IEntityState<Script>, payload: boolean) => (s.detailLoading = payload),

		createFacility: (s: IEntityState<Script>, payload: { data: Script }) => s.list.push(payload.data),

		updateDetail: (s: IEntityState<Script>, payload: { data: Script }) => (s.detail = payload.data),

		setCreateLoading: (s: IEntityState<Script>, loading: boolean) => (s.createLoading = loading),

		setUpdateLoading: (s: IEntityState<Script>, loading: boolean) => (s.updateLoading = loading)
	},
	actions: {
		async getScriptListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.scripts.getAllScripts())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения скриптов')
			} finally {
				commit('setListLoading', false)
			}
		},

		async getScriptDetailAsync({ commit }: ICommit, id: v1Api.scripts.ICurrentScript): Promise<void> {
			commit('setDetailLoading', true)
			try {
				commit('setDetail', await v1Api.scripts.getScriptById(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения скрипта')
			} finally {
				commit('setDetailLoading', false)
			}
		},

		async createScriptAsync({ commit }: ICommit, params: v1Api.scripts.IScriptParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createFacility', await v1Api.scripts.createNewScript(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания скрипта')
			} finally {
				commit('setCreateLoading', false)
			}
		},

		async updateScriptAsync({ commit }: ICommit, { id, params }: v1Api.scripts.IUpdateScriptProps): Promise<void> {
			try {
				commit('updateDetail', await v1Api.scripts.updateScriptById({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления скрипта')
			}
		}
	},
	getters: {
		useList: (s: IEntityState<Script>) => s.list,

		useDetail: (s: IEntityState<Script>) => s.detail,

		isDetailEmpty: (s: IEntityState<Script>) => s.detail.length <= 0,

		isDetailLoading: (s: IEntityState<Script>) => s.detailLoading,

		isCreateLoading: (s: IEntityState<Script>) => s.createLoading,

		isUpdateLoading: (s: IEntityState<Script>) => s.updateLoading
	}
}

export const NAMESPACE = RESOURCE['scripts']

export const actions = {
	getScriptListAsync: handlerPrefix['without'](NAMESPACE, 'getScriptListAsync'),

	getScriptDetailAsync: handlerPrefix['without'](NAMESPACE, 'getScriptDetailAsync'),

	createScriptAsync: handlerPrefix['without'](NAMESPACE, 'createScriptAsync'),

	updateScriptAsync: handlerPrefix['without'](NAMESPACE, 'updateScriptAsync')
}

export const getters = {
	useList: handlerPrefix['without'](NAMESPACE, 'useList'),

	useDetail: handlerPrefix['without'](NAMESPACE, 'useDetail'),

	isDetailLoading: handlerPrefix['without'](NAMESPACE, 'isDetailLoading'),

	isDetailEmpty: handlerPrefix['without'](NAMESPACE, 'isDetailEmpty'),

	isCreateLoading: handlerPrefix['without'](NAMESPACE, 'isCreateLoading'),

	isUpdateLoading: handlerPrefix['without'](NAMESPACE, 'isUpdateLoading')
}
