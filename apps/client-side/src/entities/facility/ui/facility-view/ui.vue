<template>
	<div class="tw-flex tw-w-full tw-items-center tw-gap-4">
		<div class="tw-flex tw-max-w-xs tw-items-start tw-gap-3">
			<div class="tw-flex tw-flex-col tw-gap-4">
				<img class="tw-w-56 tw-rounded-md" :src="`icons/24x24/${facility.facility_type?.node_index}.png`">
				<slot />
			</div>
			<p class="font-semibold tw-opacity-50">{{ facility.id }}</p>
		</div>
		<div class="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-16">
			<ColInfo sublabel="Название" :label="facility.name" />
			<ColInfo sublabel="Режим работы" :label="mode" />
			<ColInfo sublabel="Тип" :label="facility.facility_type?.name" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import { Facility } from 'shared/api'
	import { ColInfo } from 'shared/ui/col-info'

	const props = defineProps<{ facility: Facility }>()

	const mode = computed(() => {
		return props.facility.mode === 0 ? 'Тестовый' : props.facility.mode === 1 ? 'Активный' : 'Неактивный'
	})
</script>
