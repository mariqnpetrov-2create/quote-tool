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
				// const path = user.uid + '/screenshots/' + data.imageFile.name;
				const path = user.uid + '/screenshots/' + timestamp;

				const {name, price, instructions, link} = data;

				api.upload_image(path, data.imageFile).then(url => {
					api.add_quote({
						uid: user.uid,
						image: url,
						name,
						price,
						instructions,
						link
					});

					state.commit('addQuote', {
						uid: user.uid,
						image: url,
						name,
						price,
						instructions,
						link
					});
				});
			}
		});
	},

	getQuotes( {context} ) {
		api.get_quotes().then(quotes => {
			state.quotes = quotes;
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
