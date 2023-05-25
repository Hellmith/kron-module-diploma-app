import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'

import type { ICredentialsResponse, ITokenResponse } from './models'

export interface ICredentialsParams {
	params: {
		username: string
		password: string
		device: 'web' | 'laptop' | 'tablet' | 'mobile'
	}
}

export const Authenticate = ({ params }: ICredentialsParams): AxiosPromise<ICredentialsResponse> => {
	return apiInstance.post(RESOURCE['auth'], params)
}

export const RefreshToken = (): AxiosPromise<ITokenResponse> => {
	return apiInstance.get(RESOURCE['auth'] + '/refresh')
}
