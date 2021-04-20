import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store';
import vuetify from './plugins/vuetify';
import i18n from '@/lang/index';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.$store.commit('user/_setUser', userData);
    }
  },
  render: h => h(App)
}).$mount('#app')
