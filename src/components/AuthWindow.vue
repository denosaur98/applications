<template>
  <div class="auth-window">
    <div class="auth__title-wrapper">
      <h1 class="auth__title">Авторизация</h1>
    </div>
    <form class="auth__inputs">
      <h2 class="inputs__title">Логин или Телефон</h2>
      <div class="inputs__input-wrapper">
        <img src="../assets/icons/phone.svg" class="input-icon">
        <input class="contacts__input" type="number" value="+7">
      </div>
      <div class="inputs__input-wrapper">
        <img src="../assets/icons/lock.svg" class="input-icon">
        <input :type="isShowPassword ? 'text' : 'password'" class="contacts__input">
        <button type="button" class="show__password-btn" @click="togglePassword">
          <img src="../assets/icons/eye.svg" class="input-icon" style="margin-left: auto;">
        </button>
      </div>
      <button type="submit" class="login__button">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthWindow',
  data() {
    return {
      isShowPassword: false
    }
  },

  methods: {
    togglePassword() {
      this.isShowPassword = !this.isShowPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-window {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  width: 340px;
  height: 290px;
  padding: 20px;
  border-radius: 5px;

  .auth__title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    background: rgb(68, 162, 72);
    margin-top: -40px;
    border-radius: 5px;

    .auth__title {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: left;
    }
  }

  .auth__inputs {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    gap: 15px;

    .inputs__title {
      color: rgb(80, 176, 83);
      font-family: Roboto;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0%;
      text-align: left;
    }

    .inputs__input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid rgb(204, 204, 204);
      height: 40px;
      gap: 10px;

      .input-icon {
        width: 24px;
        height: 24px;
      }

      .contacts__input {
        width: 75%;
        height: 100%;
        color: rgb(51, 51, 51);
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0%;
        text-align: left;
        border: none;
      }

      .show__password-btn {
        cursor: pointer;
        border: none;
        background: none;
        width: auto;
        height: auto;
      }
    }

    .login__button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 35px;
      color: #fff;
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: center;
      border: none;
      background: rgb(80, 176, 83);
      box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
      margin: 0 auto;
      border-radius: 4px;
    }
  }
}
</style>