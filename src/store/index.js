import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null,
		errorMessage: null,
		tasks: [],
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},
		SET_ERROR_MESSAGE(state, message) {
			state.errorMessage = message
		},
		SET_TASKS(state, tasks) {
			state.tasks = tasks
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
			} catch {
				commit('SET_TOKEN', null)
				commit('SET_ERROR_MESSAGE', 'Некорректные данные')
			}
		},
		async fetchTasks({ commit, state }) {
			if (!state.token) {
				console.error('Токен не установлен')
				return
			}
			try {
				const response = await axios.get('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/', {
					headers: {
						Authorization: `Token ${state.token}`,
					},
				})
				commit('SET_TASKS', response.data)
			} catch {
				commit('SET_ERROR_MESSAGE', 'Некорректные данные')
			}
		},
	},
})
