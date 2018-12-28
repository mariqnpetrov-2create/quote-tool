import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as auth from './modules/auth';
import * as profile from './modules/profile';
import * as quote from './modules/quote';
import * as comments from './modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		profile,
		quote,
		comments
	},
	state: {
		isMainPage: true
	},

	mutations: {
		toggleOnMainPage(state) {
			state.isMainPage = true;
		},
		toggleOffMainPage(state) {
			state.isMainPage = false;
		}
	}
});
