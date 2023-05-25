import { Property, v1Api } from 'shared/api'
import { RESOURCE } from 'shared/config'
import { handlerError, handlerPrefix } from 'shared/lib'

import { router } from 'app/providers'

/**
 * МОДУЛЬ
 */
export const module = {
	/**
	 * Пространство имен
	 */
	namespaced: true,

	/**
	 * Состояние
	 */
	state: (): IEntityState<Property> => ({
		list: [],
		detail: {},
		listLoading: false,
		detailLoading: false,
		createLoading: false,
		updateLoading: false,
		deleteLoading: false
	}),

	/**
	 * Мутации
	 */
	mutations: {
		setList: (s: IEntityState<Property>, res: { data: Property[] }): Property[] =>
			(s.list = res.data.filter((p: Property) => p.facility?.id === Number(router.currentRoute.value.params.id))),
		setListLoading: (s: IEntityState<Property>, loading: boolean): boolean => (s.listLoading = loading),
		createProperty: (s: IEntityState<Property>, res: { data: Property }): void => {
			s.list.push(res.data)
		},
		updateProperty: (s: IEntityState<Property>, res: { data: Property }): void =>
			s.list.forEach((p: Property) => {
				p.name = res.data.name
				p.description = res.data.description
				p.value = res.data.value
				p.unit = res.data.unit
				p.color = res.data.color
				p.is_visible = res.data.is_visible
				p.is_fast = res.data.is_fast
				p.option = res.data.option
			}),
		deleteProperty: (s: IEntityState<Property>, id: number) => {
			const index = s.list.findIndex((property: Property) => property.id === id)

			if (index !== -1) {
				s.list.splice(index, 1)
			}
		},
		setCreateLoading: (s: IEntityState<Property>, loading: boolean): boolean => (s.createLoading = loading),
		setUpdateLoading: (s: IEntityState<Property>, loading: boolean): boolean => (s.updateLoading = loading),
		setDeleteLoading: (s: IEntityState<Property>, loading: boolean): boolean => (s.deleteLoading = loading)
	},

	/**
	 * Действия
	 */
	actions: {
		async getPropertyListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.properties.getProperties())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения свойств')
			} finally {
				commit('setListLoading', false)
			}
		},
		async createPropertyAsync({ commit }: ICommit, params: v1Api.properties.IPropertyParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createProperty', await v1Api.properties.crtProperty(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания свойства')
			} finally {
				commit('setCreateLoading', false)
			}
		},
		async updatePropertyAsync({ commit }: ICommit, { id, params }: v1Api.properties.IUpdatePropertyProps): Promise<void> {
			commit('setUpdateLoading', true)
			try {
				commit('updateProperty', await v1Api.properties.updProperty({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления свойства')
			} finally {
				commit('setUpdateLoading', false)
			}
		},
		async deletePropertyAsync({ commit }: ICommit, id: v1Api.properties.ICurrentProperty): Promise<void> {
			commit('setDeleteLoading', true)
			try {
				await v1Api.properties.delProperty(id)
			} catch (e: unknown) {
				handlerError(e, 'Ошибка удаления свойства')
			} finally {
				commit('setDeleteLoading', false)
			}
		}
	},

	/**
	 * Геттеры
	 */
	getters: {
		useList: (s: IEntityState<Property>) => s.list,
		useDetail: (s: IEntityState<Property>) => s.detail,
		isListLoading: (s: IEntityState<Property>) => s.listLoading,
		isDetailLoading: (s: IEntityState<Property>) => s.detailLoading,
		isListEmpty: (s: IEntityState<Property>) => s.list.length <= 0,
		isDetailEmpty: (s: IEntityState<Property>) => s.detail.length <= 0,
		isCreateLoading: (s: IEntityState<Property>) => s.createLoading,
		isUpdateLoading: (s: IEntityState<Property>) => s.updateLoading
	}
}

/**
 * ПРОСТРАНСТВО ИМЕН
 */
export const NAMESPACE = RESOURCE['properties']

/**
 * ДЕЙСТВИЯ
 */
export const actions = {
	/**
	 * Получить список свойств
	 */
	getPropertyListAsync: handlerPrefix['without'](NAMESPACE, 'getPropertyListAsync'),

	/**
	 * Создать свойство
	 */
	createPropertyAsync: handlerPrefix['without'](NAMESPACE, 'createPropertyAsync'),

	/**
	 * Обновить свойство
	 */
	updatePropertyAsync: handlerPrefix['without'](NAMESPACE, 'updatePropertyAsync'),

	/**
	 * Удалить свойство
	 */
	deletePropertyAsync: handlerPrefix['without'](NAMESPACE, 'deletePropertyAsync')
}

/**
 * ГЕТТЕРЫ
 */
export const getters = {
	/**
	 * Использовать список
	 */
	useList: handlerPrefix['without'](NAMESPACE, 'useList'),

	/**
	 * Использовать объект
	 * * deprecated
	 */
	useDetail: handlerPrefix['without'](NAMESPACE, 'useDetail'),

	/**
	 * Грузится ли список
	 */
	isListLoading: handlerPrefix['without'](NAMESPACE, 'isListLoading'),

	/**
	 * Грузится ли объект
	 * * deprecated
	 */
	isDetailLoading: handlerPrefix['without'](NAMESPACE, 'isDetailLoading'),

	/**
	 * Пустой ли список
	 */
	isListEmpty: handlerPrefix['without'](NAMESPACE, 'isListEmpty'),

	/**
	 * Пустой ли объект
	 * * deprecated
	 */
	isDetailEmpty: handlerPrefix['without'](NAMESPACE, 'isDetailEmpty'),

	/**
	 * Грузится ли создание
	 */
	isCreateLoading: handlerPrefix['without'](NAMESPACE, 'isCreateLoading'),

	/**
	 * Грузится ли обновление
	 */
	isUpdateLoading: handlerPrefix['without'](NAMESPACE, 'isUpdateLoading'),

	/**
	 * Грузится ли удаление
	 */
	isDeleteLoading: handlerPrefix['without'](NAMESPACE, 'isDeleteLoading')
}
