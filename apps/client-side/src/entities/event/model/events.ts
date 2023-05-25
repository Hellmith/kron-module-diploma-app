import { Event, v1Api } from 'shared/api'
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
	state: (): IEntityState<Event> => ({
		list: [],
		listLoading: false,
		createLoading: false,
		updateLoading: false,
		deleteLoading: false
	}),

	/**
	 * Мутации
	 */
	mutations: {
		setList: (s: IEntityState<Event>, res: { data: Event[] }): Event[] =>
			(s.list = res.data.filter((e: Event) => e.facility?.id === Number(router.currentRoute.value.params.id))),
		setListLoading: (s: IEntityState<Event>, loading: boolean): boolean => (s.listLoading = loading),
		createEvent: (s: IEntityState<Event>, res: { data: Event }): void => {
			s.list.push(res.data)
		},
		updateEvent: (s: IEntityState<Event>, res: { data: Event }): void =>
			s.list.forEach((e: Event) => {
				e.name = res.data.name
				e.value = res.data.value
				e.date_confirm = res.data.date_confirm
			}),
		deleteEvent: (s: IEntityState<Event>, id: number) => {
			const index = s.list.findIndex((e: Event) => e.id === id)
			if (index !== -1) {
				s.list.splice(index, 1)
			}
		},
		setCreateLoading: (s: IEntityState<Event>, loading: boolean): boolean => (s.createLoading = loading),
		setUpdateLoading: (s: IEntityState<Event>, loading: boolean): boolean => (s.updateLoading = loading),
		setDeleteLoading: (s: IEntityState<Event>, loading: boolean): boolean => (s.deleteLoading = loading)
	},

	/**
	 * Действия
	 */
	actions: {
		async getEventListAsync({ commit }: ICommit): Promise<void> {
			commit('setListLoading', true)
			try {
				commit('setList', await v1Api.events.getEvents())
			} catch (e: unknown) {
				handlerError(e, 'Ошибка получения событий')
			} finally {
				commit('setListLoading', false)
			}
		},
		async createEventAsync({ commit }: ICommit, params: v1Api.events.IEventParams): Promise<void> {
			commit('setCreateLoading', true)
			try {
				commit('createEvent', await v1Api.events.crtEvent(params))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка создания события')
			} finally {
				commit('setCreateLoading', false)
			}
		},
		async updateEventAsync({ commit }: ICommit, { id, params }: v1Api.events.IUpdateEventProps): Promise<void> {
			commit('setUpdateLoading', true)
			try {
				commit('updateEvent', await v1Api.events.updEvent({ id, params }))
			} catch (e: unknown) {
				handlerError(e, 'Ошибка обновления события')
			} finally {
				commit('setUpdateLoading', false)
			}
		},
		async deleteEventAsync({ commit }: ICommit, id: v1Api.events.ICurrentEvent): Promise<void> {
			commit('setDeleteLoading', true)
			try {
				await v1Api.events.delEvent(id)
			} catch (e: unknown) {
				handlerError(e, 'Ошибка удаления события')
			} finally {
				commit('setDeleteLoading', false)
			}
		}
	},

	/**
	 * Геттеры
	 */
	getters: {
		useList: (s: IEntityState<Event>) => s.list,
		isListLoading: (s: IEntityState<Event>) => s.listLoading,
		isListEmpty: (s: IEntityState<Event>) => s.list.length <= 0,
		isCreateLoading: (s: IEntityState<Event>) => s.createLoading,
		isUpdateLoading: (s: IEntityState<Event>) => s.updateLoading
	}
}

/**
 * ПРОСТРАНСТВО ИМЕН
 */
export const NAMESPACE = RESOURCE['events']

/**
 * ДЕЙСТВИЯ
 */
export const actions = {
	/**
	 * Получить список свойств
	 */
	getEventListAsync: handlerPrefix['without'](NAMESPACE, 'getEventListAsync'),

	/**
	 * Создать свойство
	 */
	createEventAsync: handlerPrefix['without'](NAMESPACE, 'createEventAsync'),

	/**
	 * Обновить свойство
	 */
	updateEventAsync: handlerPrefix['without'](NAMESPACE, 'updateEventAsync'),

	/**
	 * Удалить свойство
	 */
	deleteEventAsync: handlerPrefix['without'](NAMESPACE, 'deleteEventAsync')
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
