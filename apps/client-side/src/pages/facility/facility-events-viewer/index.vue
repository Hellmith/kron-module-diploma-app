<!-- :row-class="rowClass" -->
<template>
	<DataTable ref="dataview" v-model:selection="currentEvent" v-model:filters="filters"
		class="p-datatable-sm" csv-separator=";"
		:export-filename="`${transformedDate}-${currentFacility[ 'name' ]}-События`" scrollable filterDisplay="menu" scrollHeight="680px" sortField="id"
		:sort-order="-1" paginator :global-filter-fields="[ 'name', 'value', 'date_arrival', 'date_confirm' ]" :rows="15" resizable-columns column-resize-mode="fit"
		show-gridlines :value="events" selection-mode="single" dataKey="id" :rows-per-page-options="[ 5, 10, 15, 20, 25, 30 ]" :meta-key-selection="false"
		tableStyle="min-width: 50rem" paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
		current-page-report-template="{first} к {last} из {totalRecords}" @row-select="onRowSelect" @row-unselect="onRowUnSelect">
		<template #header>
			<div class="tw-flex tw-w-full tw-items-center tw-justify-between">
				<SplitButton v-if="authorities === 'ADMIN'" label="Обновить" outlined icon="pi pi-refresh" :model="eventActions" size="small"
					@click="handleRefresh()" />
				<Button v-else label="Обновить" outlined icon="pi pi-refresh" size="small" @click="handleRefresh()" />
				<div class="tw-flex tw-items-center tw-gap-3">
					<div>
						<div class="p-inputgroup flex-1 tw-max-h-[45px] tw-w-full">
							<span class="p-inputgroup-addon"> <i class="pi pi-search" /> </span>
							<InputText v-model="filters[ 'global' ].value" class="p-inputtext-sm border-noround-left" placeholder="Глобальный поиск"
								:disabled="isListLoading" />
						</div>
					</div>
					<MultiSelect class="tw-flex tw-h-[44px] tw-w-max tw-items-center" dropdown-icon="pi pi-check-square" panel-class="tw-w-max"
						:modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle" />
				</div>
			</div>
		</template>
		<Column header="#" field="id" headerStyle="width:3rem" />
		<Column v-for="col of selectedColumns" :key="col[ 'field' ]" :filter-field="col[ 'field' ]" :field="col[ 'field' ]" :header="col[ 'header' ]" sortable />
		<template #empty> События для данного объекта не существуют или не могут подгрузиться. </template>
		<template #loading> События для данного объекта подгружаются. </template>
	</DataTable>

	<Sidebar v-model:visible="createSidebarVisible">
		<template #header>
			<SidebarHeader label="Новое событие" />
		</template>
		<div class="tw-flex tw-h-full tw-flex-col tw-justify-between">
			<div class="tw-mt-[calc(1.25rem_+_1.5px)] tw-flex tw-flex-col tw-space-y-4">
				<InputWithHelp help="Введите текст.">
					<InputText v-model="name" placeholder="Наименование события (или тип)." class="p-inputtext-sm" :disabled="isCreateLoading" required />
				</InputWithHelp>
				<InputWithHelp help="Введите значение.">
					<InputText v-model="value" placeholder="Значение события" class="p-inputtext-sm" :disabled="isCreateLoading" required />
				</InputWithHelp>
				<InputWithHelp help="Выберите свойство.">
					<Dropdown v-model="property" :options="properties" optionLabel="name" class="p-inputtext-sm" showClear placeholder="Свойство"
						:disabled="isCreateLoading" required>
						<template #option="slot">
							<div class="tw-flex tw-items-center tw-gap-3">
								<div>{{ `${slot.option.name} (${slot.option.value})` }}</div>
							</div>
						</template>
					</Dropdown>
				</InputWithHelp>
				<InputWithHelp help="Дата события.">
					<Calendar v-model="dateArrival" class="p-inputtext-sm" disabled showTime hourFormat="24" />
				</InputWithHelp>
				<InputWithHelp help="Дата подтверждения.">
					<Calendar v-model="dateConfirm" class="p-inputtext-sm" :minDate="dateArrival" :maxDate="dateArrival" :disabled="isCreateLoading" showTime
						hourFormat="24" />
				</InputWithHelp>
			</div>
			<div class="tw-flex tw-justify-end">
				<Button label="Добавить" severity="success" icon="pi pi-check" iconPos="right" size="small" :loading="isCreateLoading" @click="handleCreate()" />
			</div>
		</div>
	</Sidebar>

	<Sidebar v-model:visible="updateSidebarVisible">
		<template #header>
			<SidebarHeader label="Редактирование" />
		</template>
		<div class="tw-flex tw-h-full tw-flex-col tw-justify-between">
			<div class="tw-mt-[calc(1.25rem_+_1.5px)] tw-flex tw-flex-col tw-space-y-4">
				<InputWithHelp help="Введите текст.">
					<InputText v-model="updName" placeholder="Наименование события (или тип)." class="p-inputtext-sm" :disabled="isUpdateLoading" />
				</InputWithHelp>
				<InputWithHelp help="Введите значение.">
					<InputText v-model="updValue" placeholder="Значение события" class="p-inputtext-sm" :disabled="isUpdateLoading" />
				</InputWithHelp>
				<InputWithHelp help="Выберите свойство.">
					<Dropdown v-model="updatePropertyById" :options="properties" optionLabel="name" class="p-inputtext-sm" showClear placeholder="Свойство"
						:disabled="isUpdateLoading">
						<template #option="slot">
							<div class="tw-flex tw-items-center tw-gap-3">
								<div>{{ `${slot.option.name} (${slot.option.value})` }}</div>
							</div>
						</template>
					</Dropdown>
				</InputWithHelp>
				<InputWithHelp help="Дата подтверждения.">
					<Calendar v-model="updDateConfirm" class="p-inputtext-sm" :minDate="dateArrival" :maxDate="dateArrival" :disabled="isUpdateLoading" showTime
						hourFormat="24" />
				</InputWithHelp>
			</div>
			<div class="tw-flex tw-justify-end">
				<Button label="Обновить" severity="success" icon="pi pi-check" iconPos="right" size="small" :loading="isUpdateLoading" @click="handleUpdate()" />
			</div>
		</div>
	</Sidebar>
</template>

<script setup lang="ts">
	import { FilterMatchMode } from 'primevue/api'
	import { computed, onMounted, ref } from 'vue'
	import { useStore } from 'vuex'

	import { transformedDate } from 'shared/lib'
	import { InputWithHelp } from 'shared/ui/forms'
	import { SidebarHeader } from 'shared/ui/sidebar-header'

	import { eventModel } from 'entities/event'
	import { facilityModel } from 'entities/facility'
	import { propertyModel } from 'entities/property'

	import { authModel } from 'features/auth'
	import { dt } from 'features/make-files'

	const store = useStore()

	onMounted(() => {
		store.dispatch(eventModel.actions[ 'getEventListAsync' ])
		store.dispatch(propertyModel.actions[ 'getPropertyListAsync' ])
	})

	const isListLoading = computed(() => store.getters[ eventModel.getters[ 'isListLoading' ] ])
	const events = computed(() => store.getters[ eventModel.getters[ 'useList' ] ])

	const currentFacility = computed(() => store.getters[ facilityModel.getters[ 'useDetail' ] ])

	const authorities = computed(() => store.getters[ authModel.getters[ 'useAuthorities' ] ])

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode[ 'CONTAINS' ] }
	})

	const dataview = ref()
	dt.value = dataview

	const columns = ref([
		{ field: 'name', header: 'Наименование' },
		{ field: 'value', header: 'Значение' },
		{ field: 'date_arrival', header: 'Дата события' },
		{ field: 'date_confirm', header: 'Дата подтверждения' }
	])
	const selectedColumns = ref(columns.value)
	const onToggle = (val: any) => (selectedColumns.value = columns.value.filter(col => val.includes(col)))

	const currentEvent = ref()

	const eventActions = [
		{ label: 'Добавить', icon: 'pi pi-pencil', command: () => (createSidebarVisible.value = true) },
		{
			label: 'Редактировать',
			icon: 'pi pi-cog',
			disabled: true,
			command: () => (updateSidebarVisible.value = true)
		},
		{ label: 'Удалить', icon: 'pi pi-trash', disabled: true, command: () => handleDelete() }
	]

	const onRowSelect = () => {
		eventActions[ 1 ][ 'disabled' ] = false
		eventActions[ 2 ][ 'disabled' ] = false
	}
	const onRowUnSelect = () => {
		eventActions[ 1 ][ 'disabled' ] = true
		eventActions[ 2 ][ 'disabled' ] = true
	}

	// const rowClass = (data: Property) => {
	//     return [{ 'bg-red-400 text-white': data.color == '#e11d48' }]
	// }

	const handleRefresh = () => store.dispatch(eventModel.actions[ 'getEventListAsync' ])

	const properties = computed(() => store.getters[ propertyModel.getters[ 'useList' ] ])
	const date = new Date()

	const createSidebarVisible = ref(false)
	const name = ref('')
	const value = ref('')
	const property = ref()
	const dateArrival = ref(date)
	const dateConfirm = ref()

	const isCreateLoading = computed(() => store.getters[ eventModel.getters[ 'isCreateLoading' ] ])
	const handleCreate = () => {
		store.dispatch(eventModel.actions[ 'createEventAsync' ], {
			name: name.value,
			value: value.value,
			property: property.value,
			facility: currentFacility.value,
			date_arrival: dateArrival.value,
			date_confirm: dateConfirm.value || null
		})
		createSidebarVisible.value = false
	}

	const updateSidebarVisible = ref(false)
	const updName = ref('')
	const updValue = ref('')
	const updatePropertyById = ref()
	const updDateConfirm = ref()

	const isUpdateLoading = computed(() => store.getters[ eventModel.getters[ 'isUpdateLoading' ] ])
	const handleUpdate = () => {
		const { id, name, value, property, date_confirm } = currentEvent.value
		store.dispatch(eventModel.actions[ 'updateEventAsync' ], {
			id: id,
			params: {
				name: updName.value || name,
				value: updValue.value || value,
				property: updatePropertyById.value || property,
				date_confirm: updDateConfirm.value || date_confirm
			}
		})
		updateSidebarVisible.value = false
	}

	// const facility = computed(() => store.getters[ facilityModel.getters[ 'useDetail' ] ])

	// setTimeout(() => {
	// 	properties.value.map((p: any) => {
	// 		if (p.option !== null) {
	// 			if (p.value >= p.option.value) {
	// 				store.dispatch(eventModel.actions[ 'createEventAsync' ], {
	// 					name: p.name,
	// 					value: p.value,
	// 					facility: facility.value,
	// 					property: p,
	// 					date_arrival: new Date(),
	// 					date_confirm: null
	// 				})
	// 			} else return
	// 		} else {
	// 			store.dispatch(eventModel.actions[ 'createEventAsync' ], {
	// 				name: p.name,
	// 				value: p.value,
	// 				facility: facility.value,
	// 				property: p,
	// 				date_arrival: new Date(),
	// 				date_confirm: null
	// 			})
	// 		}
	// 	})
	// }, 36000)

	const handleDelete = () => store.dispatch(eventModel.actions[ 'deleteEventAsync' ], { id: currentEvent.value[ 'id' ] })
</script>
