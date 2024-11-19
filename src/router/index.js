import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import AuthPage from '../pages/AuthPage.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'App',
			component: App,
			redirect: '/auth',
		},
		{
			path: '/auth',
			name: 'AuthPage',
			component: AuthPage,
		},
	],
})
