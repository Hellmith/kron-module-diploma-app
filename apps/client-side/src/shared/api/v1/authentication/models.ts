import type { Authorities } from '../models'

export interface ITokenResponse {
	token: string
}

export interface ICredentialsResponse extends ITokenResponse {
	authorities: Authorities
}

export type Credential = ICredentialsResponse
