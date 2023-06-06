<!-- :row-class="rowClass" -->
<template>
	<DataTable
		ref="dataview"
		v-model:selection="currentProperty"
		v-model:filters="filters"
		class="p-datatable-sm"
		csv-separator=";"
		:export-filename="`${transformedDate}-${currentFacility['name']}-Свойства`"
		scrollable
		filterDisplay="menu"
		scrollHeight="680px"
		sortField="id"
		:sort-order="-1"
		paginator
		:global-filter-fields="['name', 'description', 'is_visible', 'is_fast', 'id', 'value', 'unit']"
		:rows="15"
		resizable-columns
		column-resize-mode="fit"
		show-gridlines
		:value="properties"
		selection-mode="single"
		dataKey="id"
		:rows-per-page-options="[5, 10, 15, 20, 25, 30]"
		:meta-key-selection="false"
		tableStyle="min-width: 50rem"
		paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
		current-page-report-template="{first} к {last} из {totalRecords}"
		@row-select="onRowSelect"
		@row-unselect="onRowUnSelect"
	>
		<template #header>
			<div class="tw-flex tw-w-full tw-items-center tw-justify-between">
				<SplitButton
					v-if="authorities === 'ADMIN'"
					label="Обновить"
					outlined
					icon="pi pi-refresh"
					:model="propertyActions"
					size="small"
					@click="handleRefresh()"
				/>
				<Button v-else label="Обновить" outlined icon="pi pi-refresh" size="small" @click="handleRefresh()" />
				<div class="tw-flex tw-items-center tw-gap-3">
					<div>
						<div class="p-inputgroup flex-1 tw-max-h-[45px] tw-w-full">
							<span class="p-inputgroup-addon"> <i class="pi pi-search" /> </span>
							<InputText
								v-model="filters['global'].value"
								class="p-inputtext-sm border-noround-left"
								placeholder="Глобальный поиск"
								:disabled="isListLoading"
							/>
						</div>
					</div>
					<MultiSelect
						class="tw-flex tw-h-[44px] tw-w-max tw-items-center"
						dropdown-icon="pi pi-check-square"
						panel-class="tw-w-max"
						:modelValue="selectedColumns"
						:options="columns"
						optionLabel="header"
						@update:modelValue="onToggle"
					/>
				</div>
			</div>
		</template>
		<Column header="#" field="id" headerStyle="width:3rem" />
		<Column
			v-for="col of selectedColumns"
			:key="col['field']"
			:filter-field="col['field']"
			:field="col['field']"
			:header="col['header']"
			sortable
		/>
		<Column field="is_visible" header="Видимость (схема)" body-class="text-center" data-type="boolean">
			<template #body="{ data }">
				<i class="pi" :class="{ 'pi-eye': data['is_visible'], 'pi-eye-slash': !data['is_visible'] }" />
			</template>
			<template #filter="{ filterModel }">
				<label for="is_visible-filter" class="font-bold tw-align-middle"> Видимость (схема) </label>
				<TriStateCheckbox v-model="filterModel.value" inputId="is_visible-filter" />
			</template>
		</Column>
		<Column field="is_fast" header="Быстрое" body-class="text-center" data-type="boolean">
			<template #body="{ data }">
				<i
					class="pi"
					:class="{
						'pi-check-circle text-green-500': data['is_fast'],
						'pi-times-circle text-red-400': !data['is_fast']
					}"
				/>
			</template>
			<template #filter="{ filterModel }">
				<label for="is_fast-filter" class="font-bold tw-align-middle"> Быстрое </label>
				<TriStateCheckbox v-model="filterModel.value" inputId="is_fast-filter" />
			</template>
		</Column>
		<template #empty> Свойства для данного объекта не существуют или не могут подгрузиться. </template>
		<template #loading> Свойства для данного объекта подгружаются. </template>
	</DataTable>

	<Sidebar v-model:visible="createSidebarVisible">
		<template #header>
			<SidebarHeader label="Новое свойство" />
		</template>
		<div class="tw-flex tw-h-full tw-flex-col tw-justify-between">
			<div class="tw-mt-[calc(1.25rem_+_1.5px)] tw-flex tw-flex-col tw-space-y-4">
				<InputWithHelp help="Введите текст.">
					<InputText
						v-model="name"
						placeholder="Наименование свойства (или тип)."
						class="p-inputtext-sm"
						:disabled="isCreateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Введите текст (опционально).">
					<InputText
						v-model="description"
						placeholder="Описание свойства"
						class="p-inputtext-sm"
						:disabled="isCreateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Введите значение.">
					<InputText
						v-model="value"
						placeholder="Значение свойства"
						class="p-inputtext-sm"
						autofocus
						:disabled="isCreateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Выберите еденицу измерения.">
					<Dropdown
						v-model="unit"
						class="p-inputtext-sm"
						:options="units"
						optionLabel="label"
						showClear
						placeholder="Единица измерения"
						:disabled="isCreateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Серый - Дефолт, Оранжевый - Предупреждение, Красный - Опасность.">
					<Dropdown
						v-model="color"
						class="p-inputtext-sm"
						:options="colors"
						optionLabel="label"
						showClear
						placeholder="Дефолт"
						:disabled="isCreateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Выберите опцию из списка.">
					<Dropdown
						v-model="currentOption"
						class="p-inputtext-sm"
						:options="options"
						optionLabel="name"
						showClear
						placeholder="Опция"
						:disabled="isCreateLoading"
					>
						<template #option="slot">
							<p>{{ slot.option.name + ` (${slot.option.value})` }}</p>
						</template>
					</Dropdown>
				</InputWithHelp>
				<InputWithHelp help="Является ли свойство отображаемым.">
					<div class="tw-flex tw-items-center tw-justify-between">
						<Checkbox v-model="isVisible" :binary="true" inputId="is_visible" name="is_visible" />
						<label for="is_visible" class="ml-2"> Отображаемое свойство </label>
					</div>
				</InputWithHelp>
				<InputWithHelp help="Является ли свойство быстрым.">
					<div class="tw-flex tw-items-center tw-justify-between">
						<Checkbox v-model="isFast" :binary="true" inputId="is_fast" name="is_fast" />
						<label for="is_fast" class="ml-2"> Быстрое свойство </label>
					</div>
				</InputWithHelp>
			</div>
			<div class="tw-flex tw-justify-end">
				<Button
					label="Добавить"
					severity="success"
					icon="pi pi-check"
					iconPos="right"
					size="small"
					:loading="isCreateLoading"
					@click="handleCreate()"
				/>
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
					<InputText
						v-model="updName"
						placeholder="Наименование свойства (или тип)."
						class="p-inputtext-sm"
						:disabled="isUpdateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Введите текст (опционально).">
					<InputText
						v-model="updDescription"
						placeholder="Описание свойства"
						class="p-inputtext-sm"
						:disabled="isUpdateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Введите значение.">
					<InputText
						v-model="updValue"
						placeholder="Значение свойства"
						class="p-inputtext-sm"
						autofocus
						:disabled="isUpdateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Выберите еденицу измерения.">
					<Dropdown
						v-model="updUnit"
						class="p-inputtext-sm"
						:options="units"
						optionLabel="label"
						showClear
						placeholder="Единица измерения"
						:disabled="isUpdateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Серый - Дефолт, Оранжевый - Предупреждение, Красный - Опасность.">
					<Dropdown
						v-model="updColor"
						class="p-inputtext-sm"
						:options="colors"
						optionLabel="label"
						showClear
						placeholder="Дефолт"
						:disabled="isUpdateLoading"
					/>
				</InputWithHelp>
				<InputWithHelp help="Выберите опцию из списка.">
					<Dropdown
						v-model="currentOption"
						class="p-inputtext-sm"
						:options="options"
						optionLabel="name"
						showClear
						placeholder="Опция"
						:disabled="isUpdateLoading"
					>
						<template #option="slot">
							<p>{{ slot.option.name + ` (${slot.option.value})` }}</p>
						</template>
					</Dropdown>
				</InputWithHelp>
				<InputWithHelp help="Является ли свойство отображаемым.">
					<div class="tw-flex tw-items-center tw-justify-between">
						<Checkbox v-model="updIsVisible" :binary="true" inputId="is_visible" name="is_visible" />
						<label for="is_visible" class="ml-2"> Отображаемое свойство </label>
					</div>
				</InputWithHelp>
				<InputWithHelp help="Является ли свойство быстрым.">
					<div class="tw-flex tw-items-center tw-justify-between">
						<Checkbox v-model="updIsFast" :binary="true" inputId="is_fast" name="is_fast" />
						<label for="is_fast" class="ml-2"> Быстрое свойство </label>
					</div>
				</InputWithHelp>
			</div>
			<div class="tw-flex tw-justify-end">
				<Button
					label="Обновить"
					severity="success"
					icon="pi pi-check"
					iconPos="right"
					size="small"
					:loading="isUpdateLoading"
					@click="handleUpdate()"
				/>
			</div>
		</div>
	</Sidebar>
</template>

<script setup lang="ts">
	import { FilterMatchMode } from 'primevue/api'
	import { computed, onMounted, reactive, ref } from 'vue'
	import { useStore } from 'vuex'

	import { transformedDate } from 'shared/lib'
	import { InputWithHelp } from 'shared/ui/forms'
	import { SidebarHeader } from 'shared/ui/sidebar-header'

	import { facilityModel } from 'entities/facility'
	import { optionModel } from 'entities/option'
	import { propertyModel } from 'entities/property'

	import { authModel } from 'features/auth'
	import { dt } from 'features/make-files'

	const store = useStore()

	onMounted(() => store.dispatch(propertyModel.actions['getPropertyListAsync']))

	const isListLoading = computed(() => store.getters[propertyModel.getters['isListLoading']])
	const properties = computed(() => store.getters[propertyModel.getters['useList']])

	const currentFacility = computed(() => store.getters[facilityModel.getters['useDetail']])

	const authorities = computed(() => store.getters[authModel.getters['useAuthorities']])

	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode['CONTAINS'] },
		is_visible: { value: null, matchMode: FilterMatchMode['EQUALS'] },
		is_fast: { value: null, matchMode: FilterMatchMode['EQUALS'] }
	})

	const dataview = ref()
	dt.value = dataview

	const columns = ref([
		{ field: 'name', header: 'Наименование' },
		{ field: 'description', header: 'Описание' },
		{ field: 'value', header: 'Значение' },
		{ field: 'unit', header: 'Ед. измер.' },
		// { field: 'option.', header: 'Опция' },
		{ field: 'option.value', header: 'Предел' }
	])
	const selectedColumns = ref(columns.value)
	const onToggle = (val: any) => (selectedColumns.value = columns.value.filter(col => val.includes(col)))

	const currentProperty = ref()

	const propertyActions = [
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
		propertyActions[1]['disabled'] = false
		propertyActions[2]['disabled'] = false
	}
	const onRowUnSelect = () => {
		propertyActions[1]['disabled'] = true
		propertyActions[2]['disabled'] = true
	}

	// const rowClass = (data: Property) => {
	//     return [{ 'bg-red-400 text-white': data.color == '#e11d48' }]
	// }

	const handleRefresh = () => store.dispatch(propertyModel.actions['getPropertyListAsync'])

	const units = reactive([
		{ string: '-', label: 'Нет' },
		{ string: 'А', label: 'Амперы' },
		{ string: '%', label: 'Проценты' },
		{ string: 'шт', label: 'Штучно' }
	])

	const colors = reactive([
		{ string: 'bg-gray-300', label: 'Дефолт' },
		{ string: 'bg-orange-300', label: 'Предупреждение' },
		{ string: 'bg-red-300', label: 'Опасность' }
	])

	const options = computed(() => store.getters[optionModel.getters['useList']])
	const currentOption = ref()

	const createSidebarVisible = ref(false)
	const name = ref('')
	const description = ref('')
	const value = ref('')
	const unit = ref(units[0])
	const color = ref(colors[0])
	const isVisible = ref(false)
	const isFast = ref(false)

	const isCreateLoading = computed(() => store.getters[propertyModel.getters['isCreateLoading']])
	const handleCreate = () => {
		store.dispatch(propertyModel.actions['createPropertyAsync'], {
			name: name.value,
			description: description.value,
			value: value.value,
			unit: unit.value['string'],
			is_visible: isVisible.value,
			is_fast: isFast.value,
			color: color.value['string'],
			facility: currentFacility.value,
			option: currentOption.value
		})
		createSidebarVisible.value = false
	}

	const updateSidebarVisible = ref(false)
	const updName = ref('')
	const updDescription = ref('')
	const updValue = ref('')
	const updUnit = ref(units[0])
	const updColor = ref(colors[0])
	const updIsVisible = ref(false)
	const updIsFast = ref(false)

	const isUpdateLoading = computed(() => store.getters[propertyModel.getters['isUpdateLoading']])
	const handleUpdate = () => {
		const { id, name, description, value, unit, color, option } = currentProperty.value
		store.dispatch(propertyModel.actions['updatePropertyAsync'], {
			id: id,
			params: {
				name: updName.value || name,
				description: updDescription.value || description,
				value: updValue.value || value,
				unit: updUnit.value['string'] || unit,
				color: updColor.value['string'] || color,
				is_visible: updIsVisible.value,
				is_fast: updIsFast.value,
				option: currentOption.value || option
			}
		})
		updateSidebarVisible.value = false
	}

	const handleDelete = () =>
		store.dispatch(propertyModel.actions['deletePropertyAsync'], { id: currentProperty.value['id'] })
</script>
