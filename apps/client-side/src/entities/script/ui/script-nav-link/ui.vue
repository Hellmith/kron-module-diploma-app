<template>
    <Button label="Схема" icon="pi pi-star" size="small" :severity="$route.name !== 'facility-schema-viewer' ? 'secondary' : 'primary'"
        :text="$route.name !== 'facility-schema-viewer' ? true : false" @click="$router.push({ name: `facility-schema-viewer`, params: { id: facilityId } })" />
</template>

<script setup lang="ts">
    defineProps<{ facilityId: number }>()
</script>
