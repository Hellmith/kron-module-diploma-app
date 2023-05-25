<template>
	<Button v-tooltip.bottom="`Удалить`" icon="pi pi-trash" size="small" severity="danger" @click="handleConfirm($event)" />
</template>

<script setup lang="ts">
	import { useConfirm } from 'primevue/useconfirm'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'

	import { facilityModel } from 'entities/facility'

	const store = useStore()
	const { params } = useRoute()
	const confirm = useConfirm()

	const handleConfirm = (event: any) =>
		confirm.require({
			icon: 'pi pi-eye',
			message: 'Вы хотите удалить объект?',
			target: event.currentTarget,
			acceptClass: 'p-button-success',
			acceptIcon: 'pi pi-check',
			acceptLabel: 'Да',
			rejectClass: 'p-button-danger',
			rejectIcon: 'pi pi-times',
			rejectLabel: 'Нет',
			accept: () => {
				store.dispatch(facilityModel.actions[ 'deleteFacilityAsync' ], {
					id: params[ 'id' ]
				})
			}
		})
</script>
