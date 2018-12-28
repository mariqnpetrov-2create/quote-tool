import api from '@/lib/api';

export const state = {

};

export const actions = {
	updateUser( {rootState}, newUserData) {
		rootState.auth.user.displayName = newUserData.name;

		api.get_current_user().then(user => {
			if ( newUserData.imageFile ) {
				const path = user.uid + '/profilePicture/' + newUserData.imageFile.name;

				api.upload_image(path, newUserData.imageFile).then(url => {

					api.update_user(user, {
						displayName: newUserData.name,
						photoURL: url
					});

					rootState.auth.user.photoURL = url;
				});
			} else {
				api.update_user(user, {
					displayName: newUserData.name
				});
			}
		});
	}
};
