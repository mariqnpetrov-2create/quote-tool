import api from '@/lib/api';
import {removeDuplicated} from '@/lib/utils';

export const state = {
	comments: [],
	users: []
};

export const getters = {
	users(state) {
		return state.users;
	}
};

export const actions = {
	addComment( {context}, {id, comment} ) {
		return api.add_comment(id, comment);
	},

	addSubComment( {context}, {id, comment, commentId} ) {
		return api.add_sub_comment(id, comment, commentId);
	},

	getUsers( {state}, userId) {
		const existing = state.users.find(user => {
			return user.uid == userId;
		});

		if (!existing) {
			api.get_user_by_id(userId)
				.then( userData => {
					state.users.push(userData);
				});
		}
	}
};

export const mutations = {

};
