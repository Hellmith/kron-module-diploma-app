import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IEventResponse } from '../models'

export interface IEventParams {
	name?: string
	value?: number
	date_confirm?: Date
}

export interface ICurrentEvent {
	id: number
}

export interface IUpdateEventProps {
	id: ICurrentEvent
	params: IEventParams
}

export const getEvents = (): AxiosPromise<IEventResponse[]> => {
	return apiInstance.get(RESOURCE['events'])
}

export const getEvent = ({ id }: ICurrentEvent): AxiosPromise<IEventResponse> => {
	return apiInstance.get(RESOURCE['events'] + `/${id}`)
}

export const crtEvent = (params: IEventParams): AxiosPromise<IEventResponse> => {
	return apiInstance.post(RESOURCE['events'], params)
}

export const delEvent = ({ id }: ICurrentEvent) => {
	return apiInstance.delete(RESOURCE['events'] + `/${id}`)
}

export const updEvent = ({ id, params }: IUpdateEventProps): AxiosPromise<IEventResponse> => {
	return apiInstance.put(RESOURCE['events'] + `/${id}`, params)
}
