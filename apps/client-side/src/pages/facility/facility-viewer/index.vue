<template>
	<div class="tw-p-4">
		<Toolbar :print-ref="printRef" :facility="facility" :is-facility-loading="isFacilityLoading" />
		<div ref="printRef" class="tw-h-[calc(100vh_-_170px)] tw-w-full">
			<div v-if="$route.name == 'facility-viewer'">
				<div v-if="!isFacilityLoading">
					<FacilityReview :facility="facility" />
				</div>
				<div v-else class="w-full h-full flex align-items-center justify-content-center">
					<ProgressSpinner />
				</div>
			</div>
			<RouterView v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ComputedRef, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'

	import { Facility } from 'shared/api'

	import { facilityModel } from 'entities/facility'

	import { FacilityReview } from 'widgets/facility'
	import { Toolbar } from 'widgets/toolbar'

	const store = useStore()
	const route = useRoute()

	const printRef = ref<HTMLElement>(document.body)

	watch(
		() => route.params.id,
		() => store.dispatch(facilityModel.actions[ 'getFacilityDetailAsync' ], {
			id: route.params.id
		}),
		{ immediate: true }
	)

	const isFacilityLoading: ComputedRef<boolean> = computed(() => store.getters[ facilityModel.getters[ 'isDetailLoading' ] ])
	const facility: ComputedRef<Facility> = computed(() => store.getters[ facilityModel.getters[ 'useDetail' ] ])
</script>
