import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';
import router from './router.js';

import BaseButton from './components/atoms/BaseButton.vue';
import BaseSpinner from './components/atoms/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';

import authModule from './store/auth.js'
import userModule from './store/user.js'

const store = createStore({
    modules: {
      auth: authModule,
      user: userModule
    },
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

app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
