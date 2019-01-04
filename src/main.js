import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from '@/App.vue';
import router from '@/router';
import config from '@/config';
import store from '@/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/app.css';

Vue.use(BootstrapVue);

firebase.initializeApp(config);

new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store,
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				store.dispatch('set_user', user);
			}
		},
		(err) => {
			alert(err.message);
		});
	}
});
