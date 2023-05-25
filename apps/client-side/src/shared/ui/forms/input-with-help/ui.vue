<template>
	<div class="tw-flex tw-flex-col tw-gap-2">
		<slot />
		<small> {{ help }}</small>
	</div>
</template>

<script setup lang="ts">
	defineProps<{ help: string }>()
</script>
