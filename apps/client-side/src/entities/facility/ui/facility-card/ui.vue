<template>
	<RouterLink class="col-12 sm:col-6 lg:col-12 xl:col-2 tw-p-2 fadein animation-duration-300 animation-iteration-1 animation-ease-in" :to="{
		name: `facility-viewer`, params: {
			id: data.id
		}
	}">
		<div class="tw-border-1 tw-rounded-md tw-p-4 tw-transition-all tw-ease-in-out hover:tw-bg-gray-100">
			<div class="tw-flex tw-flex-col tw-items-center tw-py-4">
				<img class="tw-mb-3 tw-w-12 tw-rounded-md" :src="`icons/24x24/${data.facility_type?.node_index}.png`" :alt="data.name">
				<div class="tw-text-2xl tw-font-bold">{{
					data.name
				}}</div>
				<p class="tw-mb-3 tw-text-center">{{
					data.facility_type?.name
				}}</p>
				<Tag :value="data.facility_type?.node_index" :severity="getSeverity(data)" />
			</div>
		</div>
	</RouterLink>
</template>

<script setup lang="ts">
	import { Facility } from 'shared/api'

	import { getSeverity } from '../..'

	defineProps<{ data: Facility }>()
</script>
