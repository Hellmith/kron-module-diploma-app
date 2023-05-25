import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IPropertyResponse, Option } from '../models'

export interface IPropertyParams {
	name?: string
	description?: string
	value?: string
	unit?: 'шт' | '-' | 'град' | 'А' | '%'
	is_fast?: boolean
	is_visible?: boolean
	color?: string
	option?: Option
}

export interface ICurrentProperty {
	id: number
}

export interface IUpdatePropertyProps {
	id: ICurrentProperty
	params: IPropertyParams
}

export const getProperties = (): AxiosPromise<IPropertyResponse[]> => {
	return apiInstance.get(RESOURCE['properties'])
}

export const getProperty = ({ id }: ICurrentProperty): AxiosPromise<IPropertyResponse> => {
	return apiInstance.get(RESOURCE['properties'] + `/${id}`)
}

export const crtProperty = (params: IPropertyParams): AxiosPromise<IPropertyResponse> => {
	return apiInstance.post(RESOURCE['properties'], params)
}

export const delProperty = ({ id }: ICurrentProperty) => {
	return apiInstance.delete(RESOURCE['properties'] + `/${id}`)
}

export const updProperty = ({ id, params }: IUpdatePropertyProps): AxiosPromise<IPropertyResponse> => {
	return apiInstance.put(RESOURCE['properties'] + `/${id}`, params)
}
