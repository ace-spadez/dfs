import '@babel/polyfill';
// Import Component hooks before component definitions
import './component-hooks';
import Vue from 'vue';
import './plugins/vuetify';
import './plugins/vee-validate';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import VueFormulate from '@braid/vue-formulate'
import VueKatex from 'vue-katex';
import VueMathjax from 'vue-mathjax'
import 'katex/dist/katex.min.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.config.productionTip = false;
Vue.use(VueFormulate)
Vue.config.devtools = true;
import MathLive from "mathlive/dist/mathlive";
import Mathfield from "mathlive/dist/vue-mathlive.mjs";
Vue.use(Mathfield, MathLive);
Vue.use(VueMathjax)
Vue.use(VueKatex, {
  globalOptions: {
    //... Define globally applied KaTeX options here
  }
});

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
