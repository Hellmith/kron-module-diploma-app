<template>
	<form v-focustrap @submit.prevent="handleAuth">
		<div class="p-inputgroup mb-3 flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-user" />
			</span>
			<AutoComplete v-model="user" v-tooltip.focus="`Введите значение имени пользователя`" class="p-inputtext-sm" placeholder="Имя пользователя"
				optionLabel="username" :suggestions="users" :disabled="isAuthLoading || isUsersLoading" autofocus @complete="onComplete" />
		</div>
		<div class="p-inputgroup mb-3 flex-1">
			<span class="p-inputgroup-addon">
				<i class="pi pi-key" />
			</span>
			<Password v-model="form[ 'password' ]" v-tooltip.focus="`Введите значение пароля`" class="p-inputtext-sm" placeholder="Пароль" :feedback="false"
				required />
		</div>
		<Button class="w-full" type="submit" icon="pi pi-sign-in" icon-pos="right" label="Войти" size="small" :disabled="isAuthLoading" />
	</form>
</template>

<script setup lang="ts">
	import { computed, onMounted, reactive, ref } from 'vue'
	import { useStore } from 'vuex'

	import type { User } from 'shared/api'

	import { userModel } from 'entities/user'

	import { authModel } from '../..'

	const { dispatch, getters } = useStore()

	onMounted(() => {
		dispatch(userModel.actions[ 'getUserListAsync' ])
	})

	const isUsersLoading = computed((): boolean => {
		return getters[ userModel.getters[ 'isListLoading' ] ]
	})
	const isAuthLoading = computed((): boolean => {
		return getters[ authModel.getters[ 'isAuthLoading' ] ]
	})

	const users = ref<User[]>()
	const user = ref<User>()

	const form = reactive({
		password: '',
		device: 'web'
	})

	const onComplete = (event: { query: string }) => {
		const { query } = event

		!query.trim().length
			? (users.value = getters[ userModel.getters[ 'useList' ] ])
			: (users.value = getters[ userModel.getters[ 'useSearchedList' ] ](event))
	}

	const handleAuth = () => {
		dispatch(authModel.actions[ 'onAuthenticateAsync' ], {
			params: {
				username: user.value?.username,
				password: form.password,
				device: form.device
			}
		})
	}
</script>
