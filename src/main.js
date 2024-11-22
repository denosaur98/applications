import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false

Vue.use(vClickOutside)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
