<template>
  <div class="main">
    <userProgresHome v-if="isLoggedIn"/>
    <APODHome/>
    <AsteroidsHome/>
    <SunsetTimeHome/>
  </div>
</template>

<script>
import APODHome from './home/APODHome.vue'
import AsteroidsHome from './home/AsteroidsHome.vue'
import SunsetTimeHome from './home/SunsetTimeHome.vue'
import userProgresHome from './home/UserProgressHome.vue'

export default {
  components: {
    APODHome,
    AsteroidsHome,
    SunsetTimeHome,
    userProgresHome
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  created() {
    if(this.$store.getters.getToken !== null) {
      this.isLoggedIn = true;
    }
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
