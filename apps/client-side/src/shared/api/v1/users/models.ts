import type { Authorities } from '../models'

export interface IUserResponse {
	id: number
	username: string
	password: string
	lastPasswordReset: Date
	authorities: Authorities
}

export type User = IUserResponse
