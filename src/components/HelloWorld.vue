<template>
  <div class="main">
    <APODHome/>
    <AsteroidsHome/>
    <SunsetTimeHome/>
  </div>
</template>

<script>
import APODHome from './home/APODHome.vue'
import AsteroidsHome from './home/AsteroidsHome.vue'
import SunsetTimeHome from './home/SunsetTimeHome.vue'

export default {
  components: {
    APODHome,
    AsteroidsHome,
    SunsetTimeHome
  }
};
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}
</style>
