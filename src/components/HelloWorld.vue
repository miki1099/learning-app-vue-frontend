<template>
  <div class="main">
    
    <userProgresHome v-if="isLoggedIn"/>
    <div class="center" v-else>
        <base-card mode="dark">
            <h1>Zaloguj się lub załóż konto aby zacząć się uczyć!</h1>
        </base-card>
    </div>
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
import BaseCard from './UI/BaseCard.vue'

export default {
  components: {
    APODHome,
    AsteroidsHome,
    SunsetTimeHome,
    userProgresHome,
    BaseCard
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

.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
