<template>
	<Button v-tooltip.bottom="`Посмотреть на карте`" icon="pi pi-map" size="small" severity="help" @click="visible = true" />
	<Dialog v-model:visible="visible" class="tw-w-[calc(100vw_-_50vw)]" draggable :header="`Карта: ${facilityName}`">
		<div class="tw-h-full">
			<yandex-map zoom="15" :coords="coords" :controls="[`zoomControl`, `fullscreenControl`, `typeSelector`]" map-type="satellite">
				<ymap-marker :coords="coords" marker-id="1" />
			</yandex-map>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
	import { ref } from 'vue'

	defineProps<{ facilityName: string; coords: [number, number] }>()

	const visible = ref(false)
</script>

<style lang="scss">
	.ymap-container {
		height: 384px;
	}
</style>
