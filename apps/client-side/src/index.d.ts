import { Commit } from 'vuex'

declare global {
	interface ICommit {
		commit: Commit
	}

	interface IEntityState<E> {
		list?: E[]
		detail?: Record<E>

		listLoading?: boolean
		detailLoading?: boolean

		createLoading?: boolean
		updateLoading?: boolean
		deleteLoading?: boolean
	}

	interface IResponseProcessing<T> {
		data: T
	}

	interface IErrorResponse {
		statusCode: number
		timestamp: Date
		message: string
		description: string
		causes: any
		error?: string
	}
}

export {}
