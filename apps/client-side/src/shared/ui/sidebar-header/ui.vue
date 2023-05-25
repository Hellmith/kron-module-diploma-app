<script setup lang="ts">
	// Define props
	defineProps<{ label: string }>()
</script>

<template>
	<!-- sidebar-header [S] -->
	<div class="tw-flex tw-justify-start">
		<!-- sidebar-header-content [S] -->
		<p class="tw-text-xl tw-font-semibold">
			{{ label }}
		</p>
		<!-- sidebar-header-content [E] -->
	</div>
	<!-- sidebar-header [E] -->
</template>
