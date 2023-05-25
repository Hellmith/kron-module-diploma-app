<template>
	<!-- card-page-main [S] -->
	<main v-if="$route.name == `auth`" class="tw-fixed tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2" role="main">
		<!-- card-page-main-content [S] -->
		<slot />
		<!-- card-page-main-content [E] -->
	</main>
	<!-- card-page-main [E] -->

	<!-- main- [S] -->
	<slot v-else />
	<!-- main- [E] -->
</template>
