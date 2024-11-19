import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null,
		errorMessage: null,
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_ERROR_MESSAGE(state, message) {
			state.errorMessage = message
		},
	},
	actions: {
		async login({ commit }, { credentials, router }) {
			try {
				const response = await axios.post('https://dev.moydomonline.ru/api/auth/login/', credentials)
				const token = response.data.key
				commit('SET_TOKEN', token)
				commit('SET_ERROR_MESSAGE', null)
				router.push('/tasks')
			} catch (error) {
				commit('SET_TOKEN', null)
				commit('SET_ERROR_MESSAGE', 'Некорректные данные')
			}
		},
	},
})
