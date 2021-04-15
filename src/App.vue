<template>
<the-header/>
  <side-bar>
    <ul class="sidebar-panel-nav">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
  </side-bar>
  <base-card>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </base-card>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BaseCard from './components/UI/BaseCard.vue'
import SideBar from "./components/menu/SideBar.vue";
import TheHeader from './components/hearer/TheHeader.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseCard,
    SideBar,
    TheHeader
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
