<template>
    <div class='tw-w-full tw-h-full tw-grid tw-grid-cols-12'>
        <div class='tw-col-span-10'>
            <ValveShape />
        </div>
        <div class='tw-col-span-2 tw-p-4 tw-border tw-flex tw-flex-col tw-gap-2 tw-rounded-md'>
            <div class='tw-w-full p-buttonset'>
                <Button class='tw-w-1/2' icon='pi pi-play' icon-pos='right' label='Зап' size='small' severity='success'
                    :disabled='facility.mode == 0 || facility.mode == 1' @click.prevent='handleStartFacility()' />
                <Button class='tw-w-1/2' icon='pi pi-pause' icon-pos='right' label='Ост' size='small' severity='danger'
                    :disabled='facility.mode == 0 || facility.mode == 2' @click.prevent='handleStopFacility()' />
            </div>
            <SplitButton v-if='authorities === `ADMIN`' :disabled='facility.mode == 0 || facility.mode == 1' label='Сохранить' icon='pi pi-save' size='small'
                severity='info' :model="actions" @click="handleSaveScada()" />
            <div>
                <p>Текущий компонент</p>
                <div class='tw-p-2 tw-font-mono'>{{
                    scadaCurrentItem
                }}</div>
            </div>
            <div>
                <p>Вся мнемосхема</p>
                <div class='tw-p-2 tw-font-mono'>{{
                    scadaItems
                }}</div>
            </div>
        </div>
    </div>

    <Sidebar v-model:visible="shapeListVisible">
        <template #header>
            <SidebarHeader label="Список фигур" />
        </template>
    </Sidebar>
</template>

<script setup lang='ts'>
    import { useToast } from "primevue/usetoast"
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'

    import { SidebarHeader } from 'shared/ui/sidebar-header'

    import { facilityModel } from 'entities/facility'
    import { ValveShape } from 'entities/script'

    import { authModel } from 'features/auth'

    const toast = useToast()
    const store = useStore()

    const facility = computed(() => store.getters[ facilityModel.getters[ 'useDetail' ] ])

    const authorities = computed(() => store.getters[ authModel.getters[ 'useAuthorities' ] ])

    const shapeListVisible = ref(false)

    const actions = [
        {
            label: 'Добавить',
            icon: 'pi pi-pencil',
            command: () => shapeListVisible.value = true
        }
    ]

    const handleSaveScada = () => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 })
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
                script: value[ 'script' ],
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
                script: value[ 'script' ],
            }
        })
        toast.add({ severity: 'success', summary: 'Остановка', detail: 'Объект успешно остановлен', life: 3000 })
    }

    const scadaCurrentItem = ref({})

    const scadaItems = ref([])
</script>

<style class='scss'>
    .p-tieredmenu .p-menuitem-active>.p-submenu-list {
        display: block;
        left: -100%;
        top: 0;
    }
</style>