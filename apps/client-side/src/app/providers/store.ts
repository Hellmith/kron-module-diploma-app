import { createStore } from 'vuex'

import { APP } from 'shared/config'

import { eventModel } from 'entities/event'
import { facilityModel } from 'entities/facility'
import { facilityTypeModel } from 'entities/facility-type'
import { optionModel } from 'entities/options'
import { propertyModel } from 'entities/property'
import { userModel } from 'entities/user'

import { authModel } from 'features/auth'
import { pageModel } from 'features/page-preloader'

// Entity models
const { NAMESPACE: USER, module: userModule } = userModel
const { NAMESPACE: FACILITY, module: facilityModule } = facilityModel
const { NAMESPACE: FACILITY_TYPE, module: facilityTypeModule } = facilityTypeModel
const { NAMESPACE: PROPERTY, module: propertyModule } = propertyModel
const { NAMESPACE: OPTION, module: optionModule } = optionModel
const { NAMESPACE: EVENT, module: eventModule } = eventModel

// Feature models
const { NAMESPACE: PAGE, module: pageModule } = pageModel
const { NAMESPACE: AUTH, module: authModule } = authModel

/**
 * Provider store
 */
export const store = createStore({
	// Strict
	strict: APP['mode'] !== 'dev' || false,

	// Devtools
	devtools: APP['mode'] === 'dev' || false,

	// Modules
	modules: {
		[USER]: userModule,
		[FACILITY]: facilityModule,
		[FACILITY_TYPE]: facilityTypeModule,
		[PROPERTY]: propertyModule,
		[OPTION]: optionModule,
		[EVENT]: eventModule,

		[PAGE]: pageModule,
		[AUTH]: authModule
	}
})
