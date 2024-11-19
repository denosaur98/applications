<template>
  <div class="auth-page">
    <AuthWindow/>
  </div>
</template>

<script>
import AuthWindow from '@/components/AuthWindow.vue';

export default {
  name: 'AuthPage',
  components: {
    AuthWindow
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: url('/src/assets/images/auth-background.jpeg');
  background-position: center;
}
</style>