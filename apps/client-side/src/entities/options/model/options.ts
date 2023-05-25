import { Option, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

export const module = {
	namespaced: true,
	state: (): IEntityState<Option> => ({
		list: [],
		detail: {},
		listLoading: false,
		detailLoading: false,
		createLoading: false,
		updateLoading: false,
		deleteLoading: false
	}),
	mutations: {
		setList: (s: IEntityState<Option>, res: { data: Option[] }): void => {
			s.list = res.data
		},
		setDetail: (s: IEntityState<Option>, res: { data: Option }): void => {
			s.detail = res.data
		},
		setListLoading: (s: IEntityState<Option>, loading: boolean): void => {
			s.listLoading = loading
		},
		setDetailLoading: (s: IEntityState<Option>, loading: boolean): void => {
			s.detailLoading = loading
		},
		createOption: (s: IEntityState<Option>, res: { data: Option }): void => {
			s.list.push(res.data)
		},
		updateDetail: (s: IEntityState<Option>, res: { data: Option }): void => {
			s.detail = res.data
		},
		deleteDetail: (s: IEntityState<Option>, res: { status: number }): void => {
			s.detail = res.status === 200 && {}
		},
		setCreateLoading: (s: IEntityState<Option>, loading: boolean): void => {
			s.createLoading = loading
		},
		setUpdateLoading: (s: IEntityState<Option>, loading: boolean): void => {
			s.updateLoading = loading
		},
		setDeleteLoading: (s: IEntityState<Option>, loading: boolean): void => {
			s.deleteLoading = loading
		}
	},
	actions: {
		async getFacilityListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.options.getOptions())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения типов объекта')
			} finally {
				commit('setListLoading', false)
			}
		},
		async getFacilityDetailAsync({ commit }: ICommit, id: v1Api.options.ICurrentOption): Promise<void> {
			commit('setDetailLoading', true)
			try {
				commit('setDetail', await v1Api.options.getOption(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения типа объекта')
			} finally {
				commit('setDetailLoading', false)
			}
		},

		async onCrtOptionAsync({ commit }: ICommit, params: v1Api.options.IOptionParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createOption', await v1Api.options.crtOption(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания типа объекта')
			} finally {
				commit('setCreateLoading', false)
			}
		},
		async onUpdOptionAsync({ commit }: ICommit, { id, params }: v1Api.options.IUpdateOptionProps): Promise<void> {
			try {
				commit('updateDetail', await v1Api.options.updOption({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления типа объекта')
			}
		},
		async onDelOptionAsync({ commit }: ICommit, id: v1Api.options.ICurrentOption): Promise<void> {
			commit('setDeleteLoading', true)
			try {
				commit('deleteDetail', await v1Api.options.delOption(id))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка удаления типа объекта')
			} finally {
				commit('setDeleteLoading', false)
			}
		}
	},
	getters: {
		useList: (s: IEntityState<Option>) => s.list,
		useDetail: (s: IEntityState<Option>) => s.detail,
		isListEmpty: (s: IEntityState<Option>) => s.list.length <= 0,
		isDetailEmpty: (s: IEntityState<Option>) => s.detail.length <= 0,
		isListLoading: (s: IEntityState<Option>) => s.listLoading,
		isDetailLoading: (s: IEntityState<Option>) => s.detailLoading,
		isCreateLoading: (s: IEntityState<Option>) => s.createLoading,
		isUpdateLoading: (s: IEntityState<Option>) => s.updateLoading,
		isDeleteLoading: (s: IEntityState<Option>) => s.deleteLoading
	}
}

export const NAMESPACE = RESOURCE['options']

export const actions = {
	getFacilityListAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityListAsync'),
	getFacilityDetailAsync: handlerPrefix['without'](NAMESPACE, 'getFacilityDetailAsync'),
	onDelOptionAsync: handlerPrefix['without'](NAMESPACE, 'onDelOptionAsync'),
	onCrtOptionAsync: handlerPrefix['without'](NAMESPACE, 'onCrtOptionAsync'),
	onUpdOptionAsync: handlerPrefix['without'](NAMESPACE, 'onUpdOptionAsync')
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
