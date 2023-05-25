import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'
import type { FacilityType, IFacilityResponse, Script } from '../models'

export interface IFacilityParams {
	name?: string
	mode?: number
	coord_x?: number
	coord_y?: number
	facility_type?: FacilityType
	script?: Script | null
}

export interface ICurrentFacility {
	id: number
}

export interface IUpdateFacilityProps {
	id: ICurrentFacility
	params: IFacilityParams
}

export const getAllFacilities = (): AxiosPromise<IFacilityResponse[]> => {
	return apiInstance.get(RESOURCE['facilities'])
}

export const getFacilityById = ({ id }: ICurrentFacility): AxiosPromise<IFacilityResponse> => {
	return apiInstance.get(RESOURCE['facilities'] + `/${id}`)
}

export const createNewFacility = (params: IFacilityParams): AxiosPromise<IFacilityResponse> => {
	return apiInstance.post(RESOURCE['facilities'], params)
}

export const deleteFacilityById = ({ id }: ICurrentFacility) => {
	return apiInstance.delete(RESOURCE['facilities'] + `/${id}`)
}

export const updateFacilityById = ({ id, params }: IUpdateFacilityProps): AxiosPromise<IFacilityResponse> => {
	return apiInstance.put(RESOURCE['facilities'] + `/${id}`, params)
}
