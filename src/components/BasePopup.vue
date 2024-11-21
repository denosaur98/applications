<template>
  <div class="base-popup" v-if="isCreatePopupOpen">
    <div class="popup__overlay" @click="closePopup"></div>
    <form class="popup-wrapper">
      <div class="popup__title-wrapper">
        <h1 class="popup__title">Создание заявки</h1>
        <h2 class="task__title">Новая</h2>
      </div>
      <div class="popup__inputs-wrapper">
        <div class="input-wrapper">
          <input class="input__item" placeholder="Дом">
          <img src="../assets/icons/arrow-bottom.svg">
        </div>
        <div class="input-wrapper">
          <input class="input__item" placeholder="Квартира">
          <img src="../assets/icons/arrow-bottom.svg">
        </div>
        <div class="input-wrapper">
          <input class="input__item" placeholder="Срок">
        </div>
      </div>
      <div class="popup__inputs-wrapper">
        <div class="input-wrapper">
          <input class="input__item" placeholder="Фамилия">
        </div>
        <div class="input-wrapper">
          <input class="input__item" placeholder="Имя">
        </div>
        <div class="input-wrapper">
          <input class="input__item" placeholder="Отчество">
        </div>
        <div class="input-wrapper">
          <input class="input__item" placeholder="Телефон">
        </div>
      </div>
      <div class="popup__inputs-wrapper" style="height: auto;">
        <textarea class="input__item input__area" placeholder="Описание заявки"/>
      </div>
      <button class="create__task-button">Создать</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasePopup',
  
  computed: {
    ...mapState(['isCreatePopupOpen'])
  },

  methods: {
    ...mapActions(['closePopup'])
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