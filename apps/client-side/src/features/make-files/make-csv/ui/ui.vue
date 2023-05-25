<template>
	<Button v-tooltip.bottom="`Выгрузить CSV`" icon="pi pi-file-excel" severity="success" icon-pos="right" size="small" @click="handleCreateCsvFile(dt)" />
</template>

<script setup lang="ts">
	import { Ref } from 'vue'

	defineProps<{ dt: Ref<any> }>()

	const handleCreateCsvFile = (dt: Ref<any>) => dt.value.exportCSV()
</script>
