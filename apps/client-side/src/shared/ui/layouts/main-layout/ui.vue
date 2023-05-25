<script setup lang="ts">
	// Local imports
	import { FacilityGroup } from 'widgets/facility'
	import { Header } from 'widgets/header'
</script>

<template>
	<!-- Header [SE] -->
	<Header />

	<!-- slides [S] -->
	<div v-if="$route.name !== `facilities-viewer`" class="tw-grid tw-w-screen tw-grid-cols-12">
		<!-- slide-left [S] -->
		<div class="tw-col-span-2">
			<!-- slide-left-content [S] -->
			<FacilityGroup />
			<!-- slide-left-content [E] -->
		</div>
		<!-- slide-left [E] -->

		<!-- slide-right [S] -->
		<div class="tw-col-span-10">
			<!-- slide-right-content [S] -->
			<slot />
			<!-- slide-right-content [E] -->
		</div>
		<!-- slide-right [E] -->
	</div>
	<!-- slides [E] -->

	<!-- slide-main [S] -->
	<div v-else class="tw-h-full tw-max-h-[calc(100vh_-_79px)] tw-w-full">
		<!-- slide-main-content [S] -->
		<slot />
		<!-- slide-main-content [E] -->
	</div>
	<!-- slide-main [E] -->
</template>
