<template>
	<!-- Preloader -->
	<LoadingProgress />

	<!-- Layout start -->
	<component :is="currentLayout">
		<!-- Routing -->
		<Routing />
	</component>
	<!-- Layout end -->

	<!-- Toast -->
	<Toast />

	<!-- ConfirmPopup -->
	<ConfirmPopup />
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'

	import { EmptyLayout as empty, MainLayout as main } from 'shared/ui/layouts'

	import { LoadingProgress } from 'features/page-preloader'

	import { Routing } from 'pages'

	const currentLayout = computed(() => {
		const { meta } = useRoute()

		return meta[ 'layout' ] === 'main' ? main : empty
	})
</script>
