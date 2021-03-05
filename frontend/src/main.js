import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import axiosAuth from './service/axios.auth';
import axiosResource from './service/axios.resource';

Vue.config.productionTip = false;
Vue.prototype.$axiosAuth = axiosAuth;
Vue.prototype.$axiosResource = axiosResource;
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
