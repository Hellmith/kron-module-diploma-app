import type { AxiosPromise } from 'axios'

import { RESOURCE } from 'shared/config'

import apiInstance from '../base'

import type { IUserResponse } from './models'

export const getAllUsers = (): AxiosPromise<IUserResponse[]> => {
	return apiInstance.get(RESOURCE['users'])
}
