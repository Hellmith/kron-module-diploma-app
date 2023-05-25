<template>
	<div class="p-inputgroup flex-1 tw-max-h-[45px] tw-w-full">
		<span class="p-inputgroup-addon"> <i class="pi pi-search" /> </span>
		<InputText v-model="query" class="p-inputtext-sm border-noround-left" placeholder="Введите название объекта..." :disabled="disabled" />
	</div>
</template>

<script setup lang="ts">
	import { query } from '..'

	defineProps<{ disabled: boolean }>()
</script>
