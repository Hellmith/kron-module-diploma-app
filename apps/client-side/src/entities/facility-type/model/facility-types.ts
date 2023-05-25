import { FacilityType, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

export const module = {
	namespaced: true,

	state: (): IEntityState<FacilityType> => ({
		list: [],
		detail: {},
		listLoading: false,
		detailLoading: false,
		createLoading: false,
		updateLoading: false,
		deleteLoading: false
	}),

	mutations: {
		setList: (s: IEntityState<FacilityType>, payload: { data: FacilityType[] }) => (s.list = payload.data),

		setDetail: (s: IEntityState<FacilityType>, payload: { data: FacilityType }) => (s.detail = payload.data),

		setListLoading: (s: IEntityState<FacilityType>, payload: boolean) => (s.listLoading = payload),

		setDetailLoading: (s: IEntityState<FacilityType>, payload: boolean) => (s.detailLoading = payload),

		createFacilityType: (s: IEntityState<FacilityType>, payload: { data: FacilityType }) => s.list.push(payload.data),

		updateDetail: (s: IEntityState<FacilityType>, payload: { data: FacilityType }) => (s.detail = payload.data),

		deleteDetail: (s: IEntityState<FacilityType>, payload: { status: number }) => (s.detail = payload.status === 200 && {}),

		setCreateLoading: (s: IEntityState<FacilityType>, payload: boolean) => (s.createLoading = payload),

		setUpdateLoading: (s: IEntityState<FacilityType>, payload: boolean) => (s.updateLoading = payload),

		setDeleteLoading: (s: IEntityState<FacilityType>, payload: boolean) => (s.deleteLoading = payload)
	},
	actions: {
		async getFacilityListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.facilityTypes.getAllFacilityTypes())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения типов объекта')
			} finally {
				commit('setListLoading', false)
			}
		},

		async getFacilityDetailAsync({ commit }: ICommit, id: v1Api.facilityTypes.ICurrentFacilityType): Promise<void> {
			commit('setDetailLoading', true)
			try {
				commit('setDetail', await v1Api.facilityTypes.getFacilityTypeById(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения типа объекта')
			} finally {
				commit('setDetailLoading', false)
			}
		},

		async createFacilityTypeAsync({ commit }: ICommit, params: v1Api.facilityTypes.IFacilityTypeParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createFacilityType', await v1Api.facilityTypes.createFacilityType(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания типа объекта')
			} finally {
				commit('setCreateLoading', false)
			}
		},

		async updateFacilityTypeAsync({ commit }: ICommit, { id, params }: v1Api.facilityTypes.IUpdateFacilityTypeProps): Promise<void> {
			try {
				commit('updateDetail', await v1Api.facilityTypes.updateFacilityTypeById({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления типа объекта')
			}
		},

		async deleteFacilityTypeAsync({ commit }: ICommit, id: v1Api.facilityTypes.ICurrentFacilityType): Promise<void> {
			commit('setDeleteLoading', true)
			try {
				commit('deleteDetail', await v1Api.facilityTypes.deteteFacilityTypeById(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка удаления типа объекта')
			} finally {
				commit('setDeleteLoading', false)
			}
		}
	},
	getters: {
		useList: (s: IEntityState<FacilityType>) => s.list,

		useDetail: (s: IEntityState<FacilityType>) => s.detail,

		isListEmpty: (s: IEntityState<FacilityType>) => s.list.length <= 0,

		isDetailEmpty: (s: IEntityState<FacilityType>) => s.detail.length <= 0,

		isListLoading: (s: IEntityState<FacilityType>) => s.listLoading,

		isDetailLoading: (s: IEntityState<FacilityType>) => s.detailLoading,

		isCreateLoading: (s: IEntityState<FacilityType>) => s.createLoading,

		isUpdateLoading: (s: IEntityState<FacilityType>) => s.updateLoading,

		isDeleteLoading: (s: IEntityState<FacilityType>) => s.deleteLoading
	}
}

export const NAMESPACE = RESOURCE['facility-types']

export const actions = {
	getFacilityListAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityListAsync'),

	getFacilityDetailAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityDetailAsync'),

	deleteFacilityTypeAsync: handlerPrefix['without'](NAMESPACE, 'deleteFacilityTypeAsync'),

	createFacilityTypeAsync: handlerPrefix['without'](NAMESPACE, 'createFacilityTypeAsync'),

	updateFacilityTypeAsync: handlerPrefix['without'](NAMESPACE, 'updateFacilityTypeAsync')
}
export const getters = {
	useList: handlerPrefix['without'](NAMESPACE, 'useList'),

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
