import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { IFacilityTypeResponse } from '../models'

export interface IFacilityTypeParams {
	name?: string
	short_name?: string
	node_index?: number
}

export interface ICurrentFacilityType {
	id: number
}

export interface IUpdateFacilityTypeProps {
	id: ICurrentFacilityType
	params: IFacilityTypeParams
}

export const getAllFacilityTypes = (): AxiosPromise<IFacilityTypeResponse[]> => {
	return apiInstance.get(RESOURCE['facility-types'])
}

export const getFacilityTypeById = ({ id }: ICurrentFacilityType): AxiosPromise<IFacilityTypeResponse> => {
	return apiInstance.get(RESOURCE['facility-types'] + `/${id}`)
}

export const createFacilityType = (params: IFacilityTypeParams): AxiosPromise<IFacilityTypeResponse> => {
	return apiInstance.post(RESOURCE['facility-types'], params)
}

export const deteteFacilityTypeById = ({ id }: ICurrentFacilityType) => {
	return apiInstance.delete(RESOURCE['facility-types'] + `/${id}`)
}

export const updateFacilityTypeById = ({ id, params }: IUpdateFacilityTypeProps): AxiosPromise<IFacilityTypeResponse> => {
	return apiInstance.put(RESOURCE['facility-types'] + `/${id}`, params)
}
