import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IOptionResponse } from '../models'

export interface IOptionParams {
	name?: string
	value?: string
}

export interface ICurrentOption {
	id: number
}

export interface IUpdateOptionProps {
	id: ICurrentOption
	params: IOptionParams
}

export const getOptions = (): AxiosPromise<IOptionResponse[]> => {
	return apiInstance.get(RESOURCE['options'])
}

export const getOption = ({ id }: ICurrentOption): AxiosPromise<IOptionResponse> => {
	return apiInstance.get(RESOURCE['options'] + `/${id}`)
}

export const crtOption = (params: IOptionParams): AxiosPromise<IOptionResponse> => {
	return apiInstance.post(RESOURCE['options'], params)
}

export const delOption = ({ id }: ICurrentOption) => {
	return apiInstance.delete(RESOURCE['options'] + `/${id}`)
}

export const updOption = ({ id, params }: IUpdateOptionProps): AxiosPromise<IOptionResponse> => {
	return apiInstance.put(RESOURCE['options'] + `/${id}`, params)
}
