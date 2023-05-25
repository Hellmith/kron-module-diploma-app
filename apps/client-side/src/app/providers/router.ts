import { createRouter, createWebHashHistory } from 'vue-router'

import { handlerCookie } from 'shared/lib'

import { pageModel } from 'features/page-preloader'

import { routes } from 'pages'

import { store } from 'app/providers'

/**
 * Provider router
 */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

/**
 * Before each
 */
router.beforeEach((to, _, next) => {
	const { meta, fullPath } = to
	const token = handlerCookie.get('token')

	store.commit(pageModel.mutations['setLoading'], true)

	if (meta['requiresAuth'] && !token) {
		next({
			name: 'auth',
			query: {
				redirect: fullPath
			}
		})
	} else {
		next()
	}
})

/**
 * After each
 */
router.afterEach(() => store.commit(pageModel.mutations['setLoading'], false))
