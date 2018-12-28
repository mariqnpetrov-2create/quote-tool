import api from '@/lib/api';

export const state = {
	comments: []
};

export const actions = {
	addComment( {context}, {id, comment} ) {
		console.log(id, comment);
		api.add_comment(id, comment);
	}
};

export const mutations = {

};
