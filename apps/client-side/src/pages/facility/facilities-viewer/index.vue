<template>
	<div v-if="$route.name == `facilities-viewer`" class="tw-max-h-[calc(100vh_-_79px)] tw-overflow-y-auto">
		<DataView :value="currentFacilities" data-key='id' :layout="layout">
			<template #header>
				<div class="tw-flex tw-justify-between">
					<div class="fadeinleft animation-duration-300 animation-iteration-1 animation-ease-in">
						<SearchByQuery :disabled="isListLoading || isListEmpty" />
					</div>
					<DataViewLayoutOptions v-model="layout" class="fadein animation-duration-300 animation-iteration-1 animation-ease-in" />
				</div>
			</template>
			<template #list="slot">
				<FacilityRow :data="slot.data" />
			</template>
			<template #grid="slot">
				<FacilityCard :data="slot.data" />
			</template>
		</DataView>
	</div>
	<RouterView v-else />
</template>

<script setup lang="ts">
		import { computed, ComputedRef, onMounted, ref } from 'vue'
		import { useStore } from 'vuex'

		import { Facility } from 'shared/api'

		import { FacilityCard, facilityModel, FacilityRow } from 'entities/facility'

		import { query, SearchByQuery } from 'features/facility'

		const store = useStore()

		onMounted(() => store.dispatch(facilityModel.actions['getFacilityListAsync']))

		const layout = ref<'list' | 'grid' | undefined>('list')

		const isListLoading = computed(() => store.getters[facilityModel.getters['isListLoading']])
		const isListEmpty = computed(() => store.getters[facilityModel.getters['isListEmpty']])
		const currentFacilities: ComputedRef<Facility[]> = computed(() =>
			!query.value ? store.getters[facilityModel.getters['useList']] : store.getters[facilityModel.getters['useSearchedList']](query)
		)
</script>

<style lang="scss">
	.p-dataview-header {
		position: sticky;
		top: 0;
	}
</style>
