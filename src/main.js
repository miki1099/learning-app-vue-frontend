import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import router from './router.js';

const store = createStore({
    state() {
      return {
        isNavOpen: false
      };
    },
    mutations: {
          toggleNav(state) {
            state.isNavOpen = !state.isNavOpen;
          }
    }
});
const app = createApp(App)

app.use(store);
app.use(router);

app.mount('#app');
