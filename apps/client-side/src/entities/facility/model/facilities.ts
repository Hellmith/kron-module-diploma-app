import { Facility, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

import { router } from 'app/providers'

export const module = {
	namespaced: true,

	state: (): IEntityState<Facility> => ({
		list: [],
		detail: {},
		listLoading: false,
		detailLoading: false,
		createLoading: false,
		updateLoading: false,
		deleteLoading: false
	}),

	mutations: {
		setList: (s: IEntityState<Facility>, payload: { data: Facility[] }) => (s.list = payload.data),

		setDetail: (s: IEntityState<Facility>, payload: { data: Facility }) => (s.detail = payload.data),

		setListLoading: (s: IEntityState<Facility>, payload: boolean) => (s.listLoading = payload),

		setDetailLoading: (s: IEntityState<Facility>, payload: boolean) => (s.detailLoading = payload),

		createFacility: (s: IEntityState<Facility>, payload: { data: Facility }) => s.list.push(payload.data),

		updateDetail: (s: IEntityState<Facility>, payload: { data: Facility }) => (s.detail = payload.data),

		deleteDetail: (s: IEntityState<Facility>, payload: { status: number }) => {
			s.detail = payload.status === 200 && {}
			router.push({ name: 'facilities-viewer' })
		},

		setCreateLoading: (s: IEntityState<Facility>, loading: boolean) => (s.createLoading = loading),

		setUpdateLoading: (s: IEntityState<Facility>, loading: boolean) => (s.updateLoading = loading),

		setDeleteLoading: (s: IEntityState<Facility>, loading: boolean) => (s.deleteLoading = loading)
	},
	actions: {
		async getFacilityListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.facilities.getAllFacilities())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения объектов')
			} finally {
				commit('setListLoading', false)
			}
		},

		async getFacilityDetailAsync({ commit }: ICommit, id: v1Api.facilities.ICurrentFacility): Promise<void> {
			commit('setDetailLoading', true)
			try {
				commit('setDetail', await v1Api.facilities.getFacilityById(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения объекта')
			} finally {
				commit('setDetailLoading', false)
			}
		},

		async createFacilityAsync({ commit }: ICommit, params: v1Api.facilities.IFacilityParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createFacility', await v1Api.facilities.createNewFacility(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания объекта')
			} finally {
				commit('setCreateLoading', false)
			}
		},

		async updateFacilityAsync({ commit }: ICommit, { id, params }: v1Api.facilities.IUpdateFacilityProps): Promise<void> {
			try {
				commit('updateDetail', await v1Api.facilities.updateFacilityById({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления объекта')
			}
		},

		async deleteFacilityAsync({ commit }: ICommit, id: v1Api.facilities.ICurrentFacility): Promise<void> {
			commit('setDeleteLoading', true)
			try {
				commit('deleteDetail', await v1Api.facilities.deleteFacilityById(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка удаления объекта')
			} finally {
				commit('setDeleteLoading', false)
			}
		}
	},
	getters: {
		useList: (s: IEntityState<Facility>) => s.list,

		useSearchedList: (s: IEntityState<Facility>) => (query: { value: string }) =>
			s.list.filter((f: Facility) => f.name.toLowerCase().includes(query.value.toLowerCase())),

		useDetail: (s: IEntityState<Facility>) => s.detail,

		isListEmpty: (s: IEntityState<Facility>) => s.list.length <= 0,

		isDetailEmpty: (s: IEntityState<Facility>) => s.detail.length <= 0,

		isListLoading: (s: IEntityState<Facility>) => s.listLoading,

		isDetailLoading: (s: IEntityState<Facility>) => s.detailLoading,

		isCreateLoading: (s: IEntityState<Facility>) => s.createLoading,

		isUpdateLoading: (s: IEntityState<Facility>) => s.updateLoading,

		isDeleteLoading: (s: IEntityState<Facility>) => s.deleteLoading
	}
}

export const NAMESPACE = RESOURCE['facilities']

export const actions = {
	getFacilityListAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityListAsync'),

	getFacilityDetailAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityDetailAsync'),

	deleteFacilityAsync: handlerPrefix['without'](NAMESPACE, 'deleteFacilityAsync'),

	createFacilityAsync: handlerPrefix['without'](NAMESPACE, 'createFacilityAsync'),

	updateFacilityAsync: handlerPrefix['without'](NAMESPACE, 'updateFacilityAsync')
}
export const getters = {
	useList: handlerPrefix['without'](NAMESPACE, 'useList'),

	useSearchedList: handlerPrefix['without'](NAMESPACE, 'useSearchedList'),

	useDetail: handlerPrefix['without'](NAMESPACE, 'useDetail'),

	isListLoading: handlerPrefix['without'](NAMESPACE, 'isListLoading'),

	isDetailLoading: handlerPrefix['without'](NAMESPACE, 'isDetailLoading'),

	isListEmpty: handlerPrefix['without'](NAMESPACE, 'isListEmpty'),

	isDetailEmpty: handlerPrefix['without'](NAMESPACE, 'isDetailEmpty'),

	isCreateLoading: handlerPrefix['without'](NAMESPACE, 'isCreateLoading'),

	isUpdateLoading: handlerPrefix['without'](NAMESPACE, 'isUpdateLoading'),

	// !DEPRECATED
	isDeleteLoading: handlerPrefix['without'](NAMESPACE, 'isDeleteLoading')
}
