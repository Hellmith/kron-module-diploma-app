<template>
	<p class="tw-flex tw-flex-col-reverse tw-items-center tw-text-xl">
		{{ sublabel }}
		<span class="font-semibold tw-text-3xl tw-text-indigo-600">{{ label }}</span>
	</p>
</template>

<script setup lang="ts">
	defineProps<{ sublabel: string; label: string }>()
</script>
