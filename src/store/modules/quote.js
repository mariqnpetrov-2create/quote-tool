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
	addQuote( {rootState}, data) {
		api.get_current_user().then(user => {
			if ( data.imageFile ) {
				const path = user.uid + '/screenshots/' + data.imageFile.name;

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
				});
			}
		});
	},

	getQuotes( {context} ) {
		api.get_quotes().then(quotes => {
			console.log(quotes);
			state.quotes = quotes;
		})
		.catch(err => {
			console.log(err);
		})
	},

	getQuote( {context}, id ) {
		return api.get_quote(id);
	}
};
