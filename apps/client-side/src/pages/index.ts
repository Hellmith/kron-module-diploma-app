import { RouteRecordRaw } from 'vue-router'

import Routing from './index.vue'

export const routes: RouteRecordRaw[] = [
	{
        path: "/:pathMatch(.*)*",
        redirect: "/"
    },
	{
		component: () => import('./facility/facilities-viewer'),
		path: '/',
		name: 'facilities-viewer',
		meta: { layout: 'main', requiresAuth: true },
		children: [
			{
				component: () => import('./facility/facility-viewer'),
				path: 'fv/:id',
				name: 'facility-viewer',
				meta: { requiresAuth: true },
				children: [
					{
						component: () => import('./facility/facility-schema-viewer'),
						path: 'schema',
						name: 'facility-schema-viewer',
						meta: { requiresAuth: true }
					},
					{
						component: () => import('./facility/facility-events-viewer'),
						path: 'events',
						name: 'facility-events-viewer',
						meta: { requiresAuth: true }
					},
					{
						component: () => import('./facility/facility-properties-viewer'),
						path: 'properties',
						name: 'facility-properties-viewer',
						meta: { requiresAuth: true }
					}
				]
			}
		]
	},
	{
		component: () => import('./auth'),
		path: '/auth',
		name: 'auth',
		meta: { layout: 'empty' }
	}
]

export { Routing }
