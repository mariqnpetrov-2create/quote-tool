import api from '@/lib/api';

export const state = {
	quotes: []
};

export const getters = {
	quotes(state) {
		return state.quotes;
	}
}

export const actions = {
	addQuote( state, data) {
		api.get_current_user().then(user => {
			if ( data.imageFile ) {
				const timestamp = new Date().getTime();
				const path = user.uid + '/screenshots/' + timestamp;

				const {name, price, instructions, link} = data;

				api.upload_image(path, data.imageFile).then(url => {
					api.add_quote({
						uid: user.uid,
						image: url,
						name,
						price,
						instructions,
						link,
                        approved: false
					});

					state.commit('addQuote', {
						uid: user.uid,
						image: url,
						name,
						price,
						instructions,
						link,
                        approved: false
					});
				});
			}
		});
	},

	getQuotes( {context} ) {
		return api.get_quotes().then(quotes => {
			return state.quotes = quotes;
		})
		.catch(err => {
			state.quotes = [];
			console.log(err);
		})
	},

	getQuote( {context}, id ) {
		return api.get_quote(id);
	},

	deleteQuote( {context}, {id, imageURL} ) {
		return api.delete_quote(id, imageURL);
	},

    toggleApprove( {context}, {id, isApproved} ) {
        return api.toggle_approve_quote(id, isApproved);
    },

    toggleLike( {context}, {id, likedBy} ) {
    	return api.toggle_like(id,likedBy);
    }
};

export const mutations = {
	addQuote(state, payload) {
		state.quotes.push(payload);
	},
	removeQuote(state, id) {
		state.quotes = state.quotes.filter(item => {
            return item.id != id;
        });
	}
};
