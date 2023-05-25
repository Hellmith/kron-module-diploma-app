<template>
	<div class="fadeinleft animation-duration-300 animation-iteration-1 animation-ease-in tw-w-full tw-border-r tw-bg-gray-50 tw-p-4">
		<div class="tw-flex tw-h-[calc(100vh_-_89px_-_22px)] tw-flex-col tw-gap-4">
			<SearchByQuery :disabled="isListLoading" />
			<VirtualScroller
				v-if="!isListLoading"
				class="tw-h-full tw-w-full tw-overscroll-auto tw-rounded-md"
				:items="currentFacilities"
				:itemSize="48"
				showLoader
				:delay="250"
			>
				<template v-slot:item="{ item, options }">
					<FacilityLink :item="item" :options="options" />
				</template>
				<template v-slot:loader="{ options }">
					<div :class="[`flex align-items-center p-2`, { 'surface-hover': options.odd }]" style="height: 50px">
						<Skeleton :width="options.even ? `60%` : `50%`" height="1.3rem" />
					</div>
				</template>
			</VirtualScroller>
			<div v-else class="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
				<ProgressSpinner />
			</div>
			<CreateFacility v-if="authorities === `ADMIN`" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ComputedRef } from 'vue'
	import { useStore } from 'vuex'

	import { Facility } from 'shared/api'

	import { FacilityLink, facilityModel } from 'entities/facility'

	import { CreateFacility } from 'features/actions'
	import { authModel } from 'features/auth'
	import { query, SearchByQuery } from 'features/facility'

	const store = useStore()

	const authorities = computed(() => store['getters'][authModel['getters']['useAuthorities']])
	const isListLoading: ComputedRef<boolean> = computed(() => store.getters[facilityModel['getters'].isListLoading])
	const currentFacilities: ComputedRef<Facility[]> = computed(() =>
		!query.value ? store.getters[facilityModel['getters'].useList] : store.getters[facilityModel['getters'].useSearchedList](query)
	)
</script>
