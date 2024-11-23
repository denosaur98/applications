<template>
  <div class="base-popup" v-if="isCreatePopupOpen">
    <div class="popup__overlay" @click="closePopup"></div>
    <form class="popup-wrapper" @submit.prevent="submitAppeal">
      <div class="popup__title-wrapper">
        <h1 class="popup__title">{{ editingTask ? 'Редактирование' : 'Создание' }}</h1>
        <h2 class="task__title">{{ editingTask ? 'Существующая' : 'Новая' }}</h2>
      </div>
      <div class="popup__inputs-wrapper">
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.premise.address" placeholder="Дом">
          <img src="../assets/icons/arrow-bottom.svg">
        </div>
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.premise.apartments_count" placeholder="Квартира">
          <img src="../assets/icons/arrow-bottom.svg">
        </div>
        <div class="input-wrapper">
          <input class="input__item" v-model="formattedDueDate" type="datetime-local" placeholder="Срок">
        </div>
      </div>
      <div class="popup__inputs-wrapper">
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.applicant.last_name" placeholder="Фамилия">
        </div>
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.applicant.first_name" placeholder="Имя">
        </div>
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.applicant.patronymic_name" placeholder="Отчество">
        </div>
        <div class="input-wrapper">
          <input class="input__item" v-model="formData.applicant.username" placeholder="Телефон">
        </div>
      </div>
      <div class="popup__inputs-wrapper" style="height: auto;">
        <textarea class="input__item input__area" v-model="formData.description" placeholder="Описание заявки"></textarea>
      </div>
      <button class="create__task-button" type="submit">{{ editingTask ? 'Сохранить' : 'Создать' }}</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasePopup',
  data() {
    return {
      formData: {
        premise: {
          address: '',
          apartments_count: ''
        },
        due_date: '',
        applicant: {
          last_name: '',
          first_name: '',
          patronymic_name: '',
          username: ''
        },
        description: ''
      }
    }
  },

  computed: {
    ...mapState(['isCreatePopupOpen', 'editingTask', 'editingTaskId']),
    formattedDueDate: {
      get() {
        return this.formatDateForInput(this.formData.due_date)
      },
      set(value) {
        this.formData.due_date = this.parseDateFromInput(value)
      }
    }
  },

  watch: {
    editingTask(newTask) {
      if (newTask) {
        this.formData = { ...newTask }
      } else {
        this.clearFormData()
      }
    }
  },

  methods: {
    ...mapActions(['closePopup', 'createAppeal', 'editAppeal']),
    async submitAppeal() {
      try {
        console.log('Отправка данных:', this.formData)
        if (this.editingTask) {
          await this.editAppeal({ taskId: this.editingTaskId, formData: this.formData })
        } else {
          await this.createAppeal(this.formData)
        }
        this.closePopup()
        this.clearFormData()
      } catch (error) {
        this.closePopup()
        alert('Ошибка при создании/редактировании заявки: ', error)
        this.clearFormData()
      }
    },
    clearFormData() {
      this.formData = {
        premise: {
          address: '',
          apartments_count: ''
        },
        due_date: '',
        applicant: {
          last_name: '',
          first_name: '',
          patronymic_name: '',
          username: ''
        },
        description: ''
      }
    },
    formatDateForInput(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    },
    parseDateFromInput(dateString) {
      if (!dateString) return ''
      const [datePart, timePart] = dateString.split('T')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hours, minutes] = timePart.split(':').map(Number)
      const date = new Date(year, month - 1, day, hours, minutes)
      return date.toISOString()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-popup {

  .popup__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.2);
  }

  .popup-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 24px 32px;
    width: 740px;
    height: 480px;
    border-radius: 8px;

    .popup__title-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .popup__title {
        color: rgb(51, 51, 51);
        font-family: Roboto;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0%;
        text-align: left;
      }

      .task__title {
        color: rgb(51, 51, 51);
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: left;
      }
    }

    .popup__inputs-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 55px;
      gap: 15px;
      margin-top: 40px;

      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        border-bottom: 1px solid rgb(204, 204, 204);
        width: 35%;
        height: 100%;

        .select__button {
          cursor: pointer;
          display: flex;
          align-items: center;
          width: 24px;
          height: 24px;

          img {width: 100%; height: 100%;}
        }
      }

      .input__item {
        color: rgb(51, 51, 51);
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: left;
        padding: 10px 0;
        border: none;

        &.input__area {
          width: 100%;
          height: 135px;
          resize: none;
          outline: none;
          border-bottom: 1px solid rgb(204, 204, 204);
        }

        &::placeholder {
          color: rgb(171, 171, 171);
        }
      }
    }
    
    .create__task-button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 40px;
      border-radius: 2px;
      box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
      background: rgb(80, 176, 83);
      color: rgb(255, 255, 255);
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: center;
      border: none;
      margin-left: auto;
      margin-top: 25px;
    }
  }
}
</style>