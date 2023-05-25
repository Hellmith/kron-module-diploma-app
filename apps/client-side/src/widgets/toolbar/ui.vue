<template>
	<div class="fadein animation-duration-300 animation-iteration-1 animation-ease-in tw-mb-4 tw-flex tw-w-full tw-items-center tw-justify-between">
		<span class="p-buttonset">
			<FacilityNavLink :facility-id="facility.id" />
			<ScriptNavLink :facility-id="facility.id" />
			<EventNavLink :facility-id="facility.id" />
			<PropertyNavLink :facility-id="facility.id" />
		</span>
		<span v-if="$route.name !== `facility-viewer` && $route.name !== `facility-schema-viewer`"
			class="fadeinright animation-duration-300 animation-iteration-1 animation-ease-in p-buttonset">
			<MakePDF :print-ref="printRef" :facility-name="facility.name" :loading="isFacilityLoading" />
			<MakeCSV :dt="dt" />
		</span>
		<MakePDF v-else :print-ref="printRef" :facility-name="facility.name" :loading="isFacilityLoading" />
	</div>
</template>

<script setup lang="ts">
	import { Ref } from 'vue'

	import { Facility } from 'shared/api'

	import { EventNavLink } from 'entities/event'
	import { FacilityNavLink } from 'entities/facility'
	import { PropertyNavLink } from 'entities/property'
	import { ScriptNavLink } from 'entities/script'

	import { dt, MakeCSV, MakePDF } from 'features/make-files'

	defineProps<{ printRef: Ref<HTMLElement>; facility: Facility; isFacilityLoading: boolean }>()
</script>
