<template>
	<Button v-tooltip.bottom="`Выйти из аккаунта`" icon="pi pi-sign-out" severity="danger" size="small" text @click="handleLogout" />
</template>

<script setup lang="ts">
	import { useStore } from 'vuex'

	import { authModel } from '../..'

	const { dispatch } = useStore()

	const handleLogout = () => {
		dispatch(authModel.actions[ 'onLogout' ])
	}
</script>
