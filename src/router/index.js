import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('../views/Auth.vue'),
		meta: {
			layout: 'auth',
			auth: false,
		},
	},

	{
		path: '/registration',
		name: 'Registration',
		component: () => import('../views/Registration.vue'),
		meta: {
			layout: 'auth',
			auth: false,
		},
	},

	{
		path: '/score',
		name: 'Score',
		alias: '/',
		component: () => import('../views/Score.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/history',
		name: 'History',
		component: () => import('../views/History.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/planing',
		name: 'Planing',
		component: () => import('../views/Planing.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/record',
		name: 'Record',
		component: () => import('../views/Record.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/category',
		name: 'Category',
		component: () => import('../views/Category.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
	{
		path: '/history/details/:id',
		name: 'Details',
		props: true,
		component: () => import('../views/DetailRecord.vue'),
		meta: {
			layout: 'main',
			auth: true,
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
	const requireAuth = to.meta.auth;
	if (requireAuth && store.getters['auth/isAuthenticated']) {
		next();
	} else if (requireAuth && !store.getters['auth/isAuthenticated']) {
		next('/auth?message=auth');
	} else {
		next();
	}

	if (
		from.meta.layout === 'main' &&
		to.meta.layout === 'main' &&
		store.getters.infoMessage
	) {
		store.commit('clearMessage');
	}
});

export default router;
