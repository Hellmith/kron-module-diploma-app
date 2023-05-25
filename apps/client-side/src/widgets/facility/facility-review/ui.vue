<template>
	<FacilityView :facility="facility">
		<div class="tw-flex tw-w-full tw-items-center tw-justify-between">
			<span v-if="authorities === `ADMIN`" class="p-buttonset">
				<UpdateFacility :facility="facility" />
				<DeleteFacility />
			</span>
			<ShowFacilityInMap :facility-name="facility.name" :coords="[facility.coord_x, facility.coord_y]" />
		</div>
	</FacilityView>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useStore } from 'vuex'

	import { Facility } from 'shared/api'

	import { FacilityView } from 'entities/facility'

	import { DeleteFacility, ShowFacilityInMap, UpdateFacility } from 'features/actions'
	import { authModel } from 'features/auth'

	defineProps<{ facility: Facility }>()

	const store = useStore()

	const authorities = computed(() => store['getters'][authModel['getters']['useAuthorities']])
</script>
