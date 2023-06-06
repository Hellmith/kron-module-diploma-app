<script setup lang="ts">
	// Local imports
	import { FacilityGroup } from 'widgets/facility'
	import { Header } from 'widgets/header'
</script>

<template>
	<Header />
	<div v-if="$route.name !== `facilities-viewer`" class="tw-grid tw-w-screen tw-grid-cols-12">
		<div class="tw-col-span-2">
			<FacilityGroup />
		</div>
		<div class="tw-col-span-10">
			<slot />
		</div>
	</div>
	<div v-else class="tw-h-full tw-max-h-[calc(100vh_-_79px)] tw-w-full">
		<slot />
	</div>
</template>
