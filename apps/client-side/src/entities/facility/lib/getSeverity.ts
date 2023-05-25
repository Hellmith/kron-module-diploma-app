import { Facility } from 'shared/api'

export const getSeverity = (facility: Facility) => {
	switch (facility.facility_type?.id) {
		case 0:
			return 'success'

		case 1:
			return 'warning'

		case 3:
			return 'danger'

		default:
			return null
	}
}
