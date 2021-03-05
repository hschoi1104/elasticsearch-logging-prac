import Vue from 'vue';
import VueRouter from 'vue-router';
import { UserService } from './../service/user.service';
import store from './../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/object/manage',
		name: 'objectManage',
		component: () =>
			import(
				/* webpackChunkName: "objectManage" */ '../views/object/Manage.vue'
			),
	},
	{
		path: '/object/upload',
		component: () =>
			import(
				/* webpackChunkName: "objectUpload" */ '../views/object/Upload.vue'
			),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () =>
			import(/* webpackChunkName: "signup" */ '../views/user/Signup.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/user/Login.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/user/manage/auth',
		name: 'manageAuth',
		component: () =>
			import(
				/* webpackChunkName: "manageAuth" */ '../views/user/AuthManage.vue'
			),
	},
	{
		path: '/guestbook',
		name: 'guestbook',
		component: () =>
			import(
				/* webpackChunkName: "guestbook" */ '../views/guestBook/GuestBook.vue'
			),
	},
	{
		path: '/board',
		name: 'board',
		component: () =>
			import(/* webpackChunkName: "board" */ '../views/board/Board.vue'),
	},
	{
		path: '/arobject',
		name: 'arobject',
		component: () =>
			import(
				/* webpackChunkName: "arobject" */ '../views/arObject/ArObject.vue'
			),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (store.state.accessToken === null) {
		try {
			const result = await UserService.refreshToken();
			await store.dispatch('RefreshToken', result);
		} catch (err) {
			alert('로그인 해주세요');
			return next('/login');
		}
	}
	if (
		to.matched.some(record => record.meta.unauthorized) ||
		store.state.accessToken
	) {
		return next();
	}
	alert('로그인 해주세요');
	return next('/login');
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default router;
