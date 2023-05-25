<template>
	<div class="tw-flex tw-items-center tw-justify-between">
		<p class="tw-font-medium">
			{{ label }}
		</p>
		<slot />
	</div>
</template>

<script setup lang="ts">
	defineProps<{ label: string }>()
</script>
