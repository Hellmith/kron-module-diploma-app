<template>
	<RouterLink :class="[`hover:bg-gray-200 tw-flex tw-h-12 tw-items-center tw-p-2 tw-transition-all tw-ease-in-out fadein animation-duration-300 animation-iteration-1 animation-ease-in`, {
		'surface-hover': options.odd
	}]" :to="{ name: `facility-viewer`, params: { id: item.id } }">
		<div class="px-2 tw-flex tw-items-center tw-gap-3">
			<img class="tw-w-5" :src="`icons/24x24/${item.facility_type?.node_index}.png`">
			{{ item.name }}
		</div>
	</RouterLink>
</template>

<script setup lang="ts">
	import { Facility } from 'shared/api'

	defineProps<{ item: Facility; options: any }>()
</script>
