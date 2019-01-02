import api from '@/lib/api';

export const AUTH_FAILURE = 'auth/failure';
export const AUTH_LOGIN = 'auth/login';

export const state = {
	isLogged: !!localStorage.getItem('isLogged'),
	user: null,
	authFailure: null
};

export const getters = {
	isLogged(state) {
		return state.isLogged;
	},
	user(state) {
		return state.user;
	}
};

export const actions = {
	login({ commit, dispatch }, { email, password }) {
		return new Promise((resolve, reject) => {
			return api.login(email, password)
				.then((response) => {
					dispatch('set_user', response.user);

					resolve(response.user);
				})
				.catch(error => {
					console.log(error);

					commit(AUTH_FAILURE, error)
				});
		});
	},

	set_user({ commit }, data) {
		return new Promise((resolve, reject) => {
			api.get_user_by_id(data.uid).then((response) => {
				commit(AUTH_LOGIN, { data, userData: response });

				resolve(response);
			})
			.catch(err => {
				console.log(err);
			});
		});
	},

	logout({ commit }) {
		api.logout()
			.then(() => {
	  			commit('logout');
	  		});
	},

	signup({ commit }, { email, password }) {
		return new Promise((resolve, reject) => {
			return api.signup(email, password)
				.then((response) => {
					const uid = response.user.uid;
					const email = response.user.email;
					const type = 'user';

					api.set_user(uid, {
						email,
						uid,
						type
					});

					resolve(response);
				})
				.catch(error => {
					console.log(error);

					commit(AUTH_FAILURE, error)
				});
		});
	}
};

export const mutations = {
	[AUTH_LOGIN](state, {data, userData}) {
		const {email, phoneNumber, photoURL, displayName, uid} = data;

		state.isLogged = true;
		state.user = {
			email,
			phoneNumber,
			photoURL,
			displayName,
			uid,
			...userData
		};

		localStorage.isLogged = 'true';
	},
	logout(state) {
		state.isLogged = false;
		state.user = null;

		localStorage.removeItem('isLogged');
	},
	triggerLogIn(state) {
		state.isLogged = true;
	},
	[AUTH_FAILURE]: (state, error) => state.authFailure = error
};
