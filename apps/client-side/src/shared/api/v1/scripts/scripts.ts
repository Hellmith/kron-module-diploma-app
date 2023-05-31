import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IScriptResponse } from '../models'

export interface IScriptParams {
	design_web?: any
	for_facility?: number
}

export interface ICurrentScript {
	id: number
}

export interface IUpdateScriptProps {
	id: ICurrentScript
	params: IScriptParams
}

export const getAllScripts = (): AxiosPromise<IScriptResponse[]> => {
	return apiInstance.get(RESOURCE['scripts'])
}

export const getScriptById = ({ id }: ICurrentScript): AxiosPromise<IScriptResponse> => {
	return apiInstance.get(RESOURCE['scripts'] + `/${id}`)
}

export const createNewScript = (params: IScriptParams): AxiosPromise<IScriptResponse> => {
	return apiInstance.post(RESOURCE['scripts'], params)
}

export const deleteScriptById = ({ id }: ICurrentScript) => {
	return apiInstance.delete(RESOURCE['scripts'] + `/${id}`)
}

export const updateScriptById = ({ id, params }: IUpdateScriptProps): AxiosPromise<IScriptResponse> => {
	return apiInstance.put(RESOURCE['scripts'] + `/${id}`, params)
}
