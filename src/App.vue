<template>
<!-- <the-header/> -->
  <base-card>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </base-card>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BaseCard from './components/UI/BaseCard.vue'
// import TheHeader from './components/hearer/TheHeader.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseCard,
    // TheHeader
  }
}
</script>

<style>
html {
  background-color: #303133;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
  font-family: "Open Sans";
  color: #E9E9E9;
}
</style>
