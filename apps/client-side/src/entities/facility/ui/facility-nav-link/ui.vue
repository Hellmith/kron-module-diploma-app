<template>
	<Button label="Объект" icon="pi pi-home" size="small" :severity="$route.name !== 'facility-viewer' ? 'secondary' : 'primary'"
		:text="$route.name !== 'facility-viewer' ? true : false" @click="$router.push({
			name: `facility-viewer`, params: {
				id: facilityId
			}
		})" />
</template>

<script setup lang="ts">
	defineProps<{ facilityId: number }>()
</script>
