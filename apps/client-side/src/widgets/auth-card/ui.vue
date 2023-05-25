<template>
	<Card class='fadein animation-duration-300 animation-iteration-1 animation-ease-in'>
		<template #title>{{ APP[ 'title' ] }}</template>
		<template #subtitle>Авторизация</template>
		<template #content>
			<AuthForm />
		</template>
	</Card>
</template>

<script setup lang="ts">
	import { APP } from 'shared/config'

	import { AuthForm } from 'features/auth'
</script>
