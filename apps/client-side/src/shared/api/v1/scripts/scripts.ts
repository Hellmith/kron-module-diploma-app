import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IScriptResponse } from '../models'

export interface IScriptParams {
	design_web?: Text
}

export interface ICurrentScript {
	id: number
}

export interface IUpdateScriptProps {
	id: ICurrentScript
	params: IScriptParams
}

export const getScripts = (): AxiosPromise<IScriptResponse[]> => {
	return apiInstance.get(RESOURCE['scripts'])
}

export const getScript = ({ id }: ICurrentScript): AxiosPromise<IScriptResponse> => {
	return apiInstance.get(RESOURCE['scripts'] + `/${id}`)
}

export const crtScript = (params: IScriptParams): AxiosPromise<IScriptResponse> => {
	return apiInstance.post(RESOURCE['scripts'], params)
}

export const delScript = ({ id }: ICurrentScript) => {
	return apiInstance.delete(RESOURCE['scripts'] + `/${id}`)
}

export const updScript = ({ id, params }: IUpdateScriptProps): AxiosPromise<IScriptResponse> => {
	return apiInstance.put(RESOURCE['scripts'] + `/${id}`, params)
}
