export type Authorities = 'ADMIN' | 'USER' | string

export interface IFacilityTypeResponse {
	id: number
	name: string
	short_name: string
	node_index: number
}
export type FacilityType = IFacilityTypeResponse

export interface IScriptResponse {
	id: number
	design_web: string | null
}
export type Script = IScriptResponse

export interface IFacilityResponse {
	id: number
	name: string
	mode: number
	coord_x: number
	coord_y: number
	facility_type: FacilityType
	script: Script | null
}
export type Facility = IFacilityResponse

export interface IPropertyResponse {
	id: number
	facility: Facility
	name: string
	description: string
	value: string
	unit: 'шт' | '-' | 'град' | 'А' | '%'
	is_fast: boolean
	is_visible: boolean
	color: string
	option: Option
}
export type Property = IPropertyResponse

export interface IEventResponse {
	id: number
	name: string
	value: number
	facility: Facility
	property: Property
	date_arrival: Date
	date_confirm: Date
}
export type Event = IEventResponse

export interface IOptionResponse {
	id: number
	name: string
	value: string
}
export type Option = IOptionResponse

export * from './authentication/models'
export * from './users/models'
