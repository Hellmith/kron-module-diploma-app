<template>
    <ProgressBar v-show='loading' class='tw-fixed tw-top-0 tw-left-0 tw-w-full' mode="indeterminate" style="height: 6px" />
</template>

<script setup lang='ts'>
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    import { pageModel } from '.'

    const store = useStore()

    const loading = computed(() => store.getters[pageModel.getters['isLoading']])
</script>