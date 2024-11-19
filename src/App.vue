<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@font-face {
  font-family: Inter;
  src: url('/src/assets/fonts/Inter.ttf');
}

@font-face {
  font-family: Roboto;
  src: url('/src/assets/fonts/Roboto.ttf');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter;
}

input {outline: none;}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>