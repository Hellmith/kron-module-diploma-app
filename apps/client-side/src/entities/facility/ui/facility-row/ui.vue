<template>
	<RouterLink class="col-12 fadein animation-duration-300 animation-iteration-1 animation-ease-in tw-transition-all tw-ease-in-out hover:tw-bg-gray-100" :to="{
		name: `facility-viewer`, params: {
			id: data.id
		}
	}">
		<div class="tw-flex tw-items-center tw-justify-between tw-p-4">
			<div class="tw-flex tw-items-center tw-gap-4">
				<img class="w-[36px] tw-rounded-md" :src="`icons/24x24/${data.facility_type?.node_index}.png`" :alt="data.name">
				<div>
					<div class="tw-text-900 tw-text-2xl tw-font-bold">{{
						data.name
					}}</div>
					<p>{{
						`${data.facility_type?.name} (${data.facility_type?.short_name})`
					}}</p>
				</div>
			</div>
			<Tag :value="data.facility_type?.node_index" :severity="getSeverity(data)" />
		</div>
	</RouterLink>
</template>

<script setup lang="ts">
	import { Facility } from 'shared/api'

	import { getSeverity } from '../..'

	defineProps<{ data: Facility }>()
</script>
