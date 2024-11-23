import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null,
		errorMessage: null,
		tasks: [],
		isCreatePopupOpen: false,
		currentPage: 1,
		pageSize: 10,
		editingTask: null,
		editingTaskId: null,
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
		SET_OPEN_POPUP(state) {
			state.isCreatePopupOpen = true
		},
		SET_CLOSE_POPUP(state) {
			state.isCreatePopupOpen = false
		},
		SET_CURRENT_PAGE(state, page) {
			state.currentPage = page
		},
		SET_PAGE_SIZE(state, size) {
			state.pageSize = size
		},
		SET_EDITING_TASK(state, task) {
			state.editingTask = task
		},
		SET_EDITING_TASK_ID(state, taskId) {
			state.editingTaskId = taskId
		},
		CLEAR_EDITING_TASK(state) {
			state.editingTask = null
			state.editingTaskId = null
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
		async fetchTasks({ commit, state }, { page = 1, pageSize = 10 } = {}) {
			if (!state.token) {
				console.error('Токен не установлен')
				if (router.currentRoute.path !== '/auth') {
					router.push('/auth')
				}
				return
			}
			try {
				const response = await axios.get('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/', {
					headers: {
						Authorization: `Token ${state.token}`,
					},
					params: {
						page: page,
						page_size: pageSize,
					},
				})
				commit('SET_TASKS', response.data)
				commit('SET_CURRENT_PAGE', page)
				commit('SET_PAGE_SIZE', pageSize)
			} catch (error) {
				if (error.response && error.response.status === 401) {
					commit('SET_TOKEN', null)
					commit('SET_ERROR_MESSAGE', 'Неверный токен')
					if (router.currentRoute.path !== '/auth') {
						router.push('/auth')
					}
				} else {
					commit('SET_ERROR_MESSAGE', 'Некорректные данные')
				}
			}
		},
		openPopup({ commit }) {
			commit('SET_OPEN_POPUP')
		},
		closePopup({ commit }) {
			commit('SET_CLOSE_POPUP')
			commit('CLEAR_EDITING_TASK')
		},
		async createAppeal({ state }, formData) {
			try {
				const response = await axios.post('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/', formData, {
					headers: {
						Authorization: `Token ${state.token}`,
					},
				})
				console.log('Заявка создана:', response.data)
				return response.data
			} catch (error) {
				if (error.response && error.response.status === 401) {
					if (router.currentRoute.path !== '/auth') {
						router.push('/auth')
					}
				} else {
					console.error('Ошибка при создании заявки:', error)
				}
				throw error
			}
		},
		async editAppeal({ state, commit }, { taskId, formData }) {
			try {
				const response = await axios.patch(`https://dev.moydomonline.ru/api/appeals/v1.0/appeals/${taskId}/`, formData, {
					headers: {
						Authorization: `Token ${state.token}`,
					},
				})
				console.log('Заявка отредактирована:', response.data)
				commit('SET_EDITING_TASK', null)
				commit('SET_EDITING_TASK_ID', null)
				return response.data
			} catch (error) {
				if (error.response && error.response.status === 401) {
					commit('SET_TOKEN', null)
					commit('SET_ERROR_MESSAGE', 'Неверный токен')
					if (router.currentRoute.path !== '/auth') {
						router.push('/auth')
					}
				} else {
					console.error('Ошибка при редактировании заявки:', error)
				}
				throw error
			}
		},
		setEditingTask({ commit }, task) {
			commit('SET_EDITING_TASK', task)
			commit('SET_EDITING_TASK_ID', task.id)
			commit('SET_OPEN_POPUP')
		},
	},
})
