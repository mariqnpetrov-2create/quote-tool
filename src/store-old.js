import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLogged: false,
		user: null,
		isMainPage: true
	},
	getters: {
		isLogged(state) {
			return state.isLogged;
		}
	},
	mutations: {
		login(state, data) {
			const {email, phoneNumber, photoURL, displayName, type, uid} = data;

			state.isLogged = true;
			state.user = {
				email,
				phoneNumber,
				photoURL,
				displayName,
				type,
				id: data.uid,
				assignments
			};

			console.log(state.user);
		},
		logout(state) {
			state.isLogged = false;
			state.user = null;
		},
		toggleOnMainPage(state) {
			state.isMainPage = true;
		},
		toggleOffMainPage(state) {
			state.isMainPage = false;
		},
		updateUser(state, newUserData) {
			state.user = newUserData;

			const oldUser = firebase.auth().currentUser;

			if ( newUserData.imageFile ) {
				const path = oldUser.uid + '/profilePicture/' + newUserData.imageFile.name;
				const storageRef = firebase.storage().ref(path);

				storageRef.put(newUserData.imageFile).then(response => {
					oldUser.updateProfile({
						displayName: newUserData.displayName,
						photoURL: response.downloadURL
					});

					state.user.photoURL = response.downloadURL;
				});
			} else {
				oldUser.updateProfile({
					displayName: newUserData.displayName
				});
			}
		}
	},
	actions: {
		login(context, user) {
			return firebase.database().ref('/users/' + user.uid).once('value')
				.then((snapshot) => {
					Object.assign(user, snapshot.val());

					context.commit('login', user);

					context.dispatch('getAssignments');
				});
		},

		logout(context) {
			firebase.auth().signOut()
				.then(() => {
		  			context.commit('logout');
		  		});
		}
	}
});
