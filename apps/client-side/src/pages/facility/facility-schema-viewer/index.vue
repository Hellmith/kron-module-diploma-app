<template>
	<div class="tw-grid tw-h-full tw-w-full tw-grid-cols-12">
		<div class="tw-col-span-10">
			<div ref="viewport" class="viewport" @click="selectNone()">
				<div v-if="scadaItems.length === 0">Схема не существует.</div>
				<div v-for="i in scadaItems" :key="i.id" :data-target-id="i.id" :class="{
					item: true,
					target: i.id === currentScadaItem?.id
				}" :style="getSkadaItemStyle(i)" @click.stop="() => handleSelectSkadaItem(i)">
					<img :src="i.image">
					<div v-if="i === currentScadaItem" class="decorator decorator-delete" title="delete item" @click.stop="handleDeleteItem(i)">
						&times;
					</div>
					<div v-if="i === currentScadaItem" class="decorator decorator-size" :style="{ zoom: 1 }">
						X: {{ i.x }} &nbsp; Y: {{ i.y }} &nbsp; W: {{ i.w }} &nbsp; H: {{ i.h }} &nbsp;{{
							i.r !== 0 ? ' R: ' + i.r + '°' : ''
						}}
					</div>
				</div>
				<Moveable v-if="currentTargetID != ''" ref="moveable" :target="[ '.target' ]" :draggable="true" :rotatable="true" :resizable="true"
					:elementGuidelines="elementGuidelines()" :origin="false" :throttle-drag="1" :throttle-resize="1" :throttle-rotate="shiftPressed ? 45 : 1"
					:keep-ratio="shiftPressed" :snappable="true" :snapGap="false" :snapDirections="{
						top: true,
						bottom: true,
						left: true,
						right: true,
						center: true,
						middle: true
					}" :elementSnapDirections="{
	top: true,
	bottom: true,
	left: true,
	right: true,
	center: true,
	middle: true
}" :isDisplayInnerSnapDigit="true" @drag="onDrag" @resize="onResize" @rotate="onRotate" />
			</div>
		</div>
		<div class="tw-col-span-2 tw-flex tw-flex-col tw-gap-2 tw-rounded-md tw-border tw-p-4">
			<div class="p-buttonset tw-w-full">
				<Button class="tw-w-1/2" icon="pi pi-play" icon-pos="right" label="Зап" size="small" severity="success"
					:disabled="facility.mode == 0 || facility.mode == 1" @click.prevent="handleStartFacility()" />
				<Button class="tw-w-1/2" icon="pi pi-pause" icon-pos="right" label="Ост" size="small" severity="danger"
					:disabled="facility.mode == 0 || facility.mode == 2" @click.prevent="handleStopFacility()" />
			</div>
			<SplitButton v-if="authorities === `ADMIN`" :disabled="facility.mode == 0 || facility.mode == 1" label="Сохранить" icon="pi pi-save" size="small"
				severity="info" :model="actions" :loading="isCreateScript" @click="handleSaveScada()" />
			<div class="tw-h-max">
				<p>Выбранный объект</p>
				<div class="tw-h-full tw-overflow-y-auto tw-px-2 tw-font-mono">
					<div class="tw-py-2 tw-pl-2 tw-text-sm">
						<p class="tw-font-semibold">
							<span class="tw-font-medium tw-text-gray-600"> SID: </span>
							{{ currentScadaItem?.id }}
						</p>
						<ul>
							<li class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Название: </span>
								{{ currentScadaItem?.title }}
							</li>
							<li class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Положение: </span>
								{{ currentScadaItem?.x }}x<span class="tw-font-medium tw-text-gray-600">,</span>
								{{ currentScadaItem?.y }}y<span class="tw-font-medium tw-text-gray-600">,</span>
								{{ currentScadaItem?.z }}z
							</li>
							<li class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Размер: </span>
								{{ currentScadaItem?.w }}w<span class="tw-font-medium tw-text-gray-600">,</span>
								{{ currentScadaItem?.h }}h
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="tw-h-full">
				<p>Вся мнемосхема</p>
				<div class="tw-max-h-[calc(571px_-_24px)] tw-overflow-y-auto tw-px-2 tw-font-mono">
					<div v-for="i in scadaItems" :key="i?.id" :class="[
						{
							'tw-border-l-2 tw-border-blue-600': i.title === 'Датчик'
						},
						'tw-py-2 tw-pl-2 tw-text-sm'
					]">
						<p class="tw-font-semibold">
							<span class="tw-font-medium tw-text-gray-600"> SID: </span>
							{{ i?.id }}
						</p>
						<ul>
							<li v-if="i.title !== '-'" class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Название: </span> {{ i.title }}
							</li>
							<li class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Положение: </span> {{ i.x }}x<span class="tw-font-medium tw-text-gray-600">,</span>
								{{ i.y }}y<span class="tw-font-medium tw-text-gray-600">,</span> {{ i.z }}z
							</li>
							<li class="tw-font-semibold">
								<span class="tw-font-medium tw-text-gray-600"> Размер: </span> {{ i.w }}w<span class="tw-font-medium tw-text-gray-600">,</span>
								{{ i.h }}h
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Sidebar v-model:visible="shapeListVisible">
		<template #header>
			<SidebarHeader label="Список объектов" />
		</template>
		<div class="tw-flex tw-h-full tw-flex-col">
			<Accordion :multiple="true" :activeIndex="[ 0, 1, 2, 3, 4 ]">
				<AccordionTab v-for="s in shapes" :key="s.label" :header="s.label">
					<div v-for="i in s.items" :key="i.id" class="tw-flex tw-w-full tw-items-center tw-justify-between">
						<div class="tw-w-full">
							<img :class="[
								{
									'tw-w-1/3': s.label === 'Индикаторы' || s.label === 'Фигуры',
									'tw-w-5/6': s.label === 'Резервуары'
								},
								'py-2 tw-h-auto'
							]" :src="i.image" @click="scadaItems.push(handleCreateSkadaItem(i.id, i.label, i.image, $event.target))">
						</div>
						<p class="tw-text-sm">{{ i.label }}</p>
					</div>
				</AccordionTab>
			</Accordion>
		</div>
	</Sidebar>
</template>

<style>
	.viewport {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.item {
		box-sizing: border-box;
		position: absolute;
		top: 0px;
		left: 0px;
		text-align: center;
		font-weight: normal;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1px;
		user-select: none;
	}

	.item .decorator {
		position: absolute;
		border: 1px solid #4af;
		border-radius: 4px;
		background-color: #4af;
		color: white;
		text-align: center;
		font-weight: normal;
		line-height: 1;
	}

	.item .decorator-delete {
		top: 0px;
		right: -32px;
		width: 24px;
		height: 24px;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
	}

	.item .decorator-size {
		position: absolute;
		bottom: -30px;
		left: 0px;
		user-select: none;
		width: auto;
		height: auto;
		font-size: 14px;
		padding: 4px 8px;
		white-space: nowrap;
	}
</style>

<script setup lang="ts">
	import { useKeyModifier } from '@vueuse/core'
	import { useToast } from 'primevue/usetoast'
	import { computed, nextTick, onMounted, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'
	import Moveable from 'vue3-moveable'
	import { useStore } from 'vuex'

	import shapes from 'shared/ui/shapes'
	import { SidebarHeader } from 'shared/ui/sidebar-header'

	import { facilityModel } from 'entities/facility'
	import { scriptModel } from 'entities/script'

	import { authModel } from 'features/auth'

	const toast = useToast()
	const store = useStore()
	const { params } = useRoute()

	onMounted(() => {
		store.dispatch(scriptModel.actions.getScriptListAsync)
	})

	const facility = computed(() => store.getters[ facilityModel.getters.useDetail ])

	const scripts = computed(() => {
		return store.getters[ scriptModel.getters.useList ]
	})

	const script = computed(() => {
		const scriptsValue = scripts.value
		return scriptsValue ? scriptsValue.find((s: any) => s.for_facility === Number(params.id)) : null
	})

	const currentScadaItem = ref()
	const scadaItems = ref<any>([])

	watch([ facility, script ], ([ facilityValue, scriptValue ]) => {
		if (facilityValue.script === null && scriptValue && scriptValue.length !== 0) {
			scadaItems.value = JSON.parse(scriptValue.design_web)
		} else if (facilityValue.script !== null) {
			scadaItems.value = JSON.parse(facilityValue?.script?.design_web)
		}
	})

	const handleSaveScada = () => {
		const schema = JSON.stringify(scadaItems.value)

		if (facility.value.script === null) {
			store.dispatch(scriptModel.actions.createScriptAsync, {
				design_web: schema,
				for_facility: facility.value.id
			}).then(() => {
				store.dispatch(facilityModel.actions.updateFacilityAsync, {
					id: params.id,
					params: {
						name: facility.value.name,
						mode: facility.value.mode,
						coord_x: facility.value.coord_x,
						coord_y: facility.value.coord_y,
						facility_type: facility.value.facility_type,
						script: script.value
					}
				}).then(() => {
					store.dispatch(facilityModel.actions.getFacilityDetailAsync, {
						id: params.id
					})
				})
			})
		} else {
			store.dispatch(scriptModel.actions.updateScriptAsync, {
				id: script.value.id,
				params: {
					design_web: schema
				}
			}).then(() => {
				store.dispatch(facilityModel.actions.getFacilityDetailAsync, {
					id: params.id
				})
			})
		}
	}

	const viewport = ref()
	const shiftPressed = useKeyModifier('Shift')

	const authorities = computed(() => store.getters[ authModel.getters[ 'useAuthorities' ] ])

	const shapeListVisible = ref(false)

	const actions = [
		{
			label: 'Добавить',
			icon: 'pi pi-pencil',
			command: () => (shapeListVisible.value = true)
		}
	]

	function elementGuidelines() {
		if (!viewport.value) return []

		return Array.prototype.slice
			.call(viewport.value!.querySelectorAll('.item'), 0)
			.filter(n => !n.classList.contains('target'))
	}

	const handleStartFacility = () => {
		const { value } = facility

		store.dispatch(facilityModel.actions[ 'updateFacilityAsync' ], {
			id: value[ 'id' ],
			params: {
				name: value[ 'name' ],
				mode: 1,
				coord_x: value[ 'coord_x' ],
				coord_y: value[ 'coord_y' ],
				facility_type: value[ 'facility_type' ],
				script: value[ 'script' ]
			}
		})
		toast.add({ severity: 'success', summary: 'Запуск', detail: 'Объект успешно запущен', life: 3000 })
	}

	const handleStopFacility = () => {
		const { value } = facility

		store.dispatch(facilityModel.actions[ 'updateFacilityAsync' ], {
			id: value[ 'id' ],
			params: {
				name: value[ 'name' ],
				mode: 2,
				coord_x: value[ 'coord_x' ],
				coord_y: value[ 'coord_y' ],
				facility_type: value[ 'facility_type' ],
				script: value[ 'script' ]
			}
		})
		toast.add({ severity: 'success', summary: 'Остановка', detail: 'Объект успешно остановлен', life: 3000 })
	}

	const selectNone = () => {
		currentTargetID.value = ''
		currentScadaItem.value = {}
	}

	function getRandomFloat(min: any, max: any, decimals: any) {
		const str = (Math.random() * (max - min) + min).toFixed(decimals)

		return parseFloat(str)
	}

	const handleDeleteItem = (item: any) => {
		scadaItems.value.splice(scadaItems.value.indexOf(item), 1)
		selectNone()
	}

	const handleCreateSkadaItem = (id: number, title = '', image: any, el: any) => {
		return {
			id: getRandomFloat(id, id + 0.5, 2),
			title,
			x: 0,
			y: 0,
			z: 0,
			w: el.offsetWidth,
			h: el.offsetHeight,
			r: 0,
			background: `url('${image}') no-repeat center/contain`,
			imageUrl: image
		}
	}

	const getSkadaItemStyle = (item: any) => {
		let t = `translate(${item.x}px, ${item.y}px)`
		if (item.r != 0) t += ` rotate(${item.r})`

		return {
			width: item.w + 'px',
			height: item.h + 'px',
			zIndex: item.z,
			background: item.background,
			transform: t,
			border: 'none'
		}
	}

	const currentTargetID = ref('')

	const handleSelectSkadaItem = (item: any) => {
		currentTargetID.value = ''
		currentScadaItem.value = {}

		nextTick(() => {
			currentTargetID.value = item.id
			currentScadaItem.value = item
		})
	}

	const findItem = (el: any) => {
		const id = el.dataset.targetId
		return scadaItems.value.find((v: any) => v.id == id)
	}

	const onDrag = (e: any) => {
		const item = findItem(e.target)
		if (!item) return

		item.x = e.beforeTranslate[ 0 ]
		item.y = e.beforeTranslate[ 1 ]

		e.target.style.transform = e.transform
	}
	const onResize = (e: any) => {
		const item = findItem(e.target)
		if (!item) return

		item.w = e.width
		item.h = e.height

		e.target.style.width = `${e.width}px`
		e.target.style.height = `${e.height}px`
	}
	const onRotate = (e: any) => {
		const item = findItem(e.target)
		if (item) {
			item.r = e.beforeRotate
			e.target.style.transform = e.drag.transform
		}
	}
</script>

<style class="scss">
	.p-tieredmenu .p-menuitem-active>.p-submenu-list {
		display: block;
		left: -100%;
		top: 0;
	}
</style>
