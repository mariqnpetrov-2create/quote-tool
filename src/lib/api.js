import {
	importAuth,
	importDatabase,
	importStorage
} from './firebase';

const database_users = 'users';
const database_quotes = 'quotes';
const database_comments = 'comments';

class API {
	constructor(auth, database, storage) {
		this.auth = auth;
		this.database = database;
		this.storage = storage;
	}

	login(email, password) {
		return this.auth().then((auth) => {
			return auth().signInWithEmailAndPassword(email, password);
		})
	}

	signup(email, password) {
		return this.auth().then((auth) => {
			return auth().createUserWithEmailAndPassword(email, password);
		})
	}

	set_user(id, payload, merge = false) {
		return this.database().then(database => {
			return database()
				.collection(database_users)
				.doc(id)
				.set(payload, { merge: merge });
		});
	}

	update_user(user, payload) {
		user.updateProfile(payload);
	}

	get_user_by_id(uid) {
		return this.database().then(database => {
			return new Promise((resolve, reject) => {
				database()
					.collection(database_users)
					.where('uid', '==', uid)
					.get()
					.then(snapshot => {
						if (!snapshot.empty) {
							snapshot.forEach(doc => resolve(doc.data()));
						} else {
							reject(null);
						}
					});
			});
		});
	}

	get_current_user() {
		return this.auth().then(auth => {
			return auth().currentUser;
		});
	}

	upload_image(path, image) {
		return this.storage().then(storage => {
			const storageRef = storage().ref(path);

			return storageRef.put(image).then(snapshot => {
				return storageRef.getDownloadURL().then(url => {
					return url;
				})
				.catch(error => {
					console.log(error);
				});
			});
		});
	}

	logout() {
		return this.auth().then(auth => {
			return auth().signOut();
		});
	}

	add_quote(payload) {
		return this.database().then(database => {
			return database()
				.collection(database_quotes)
				.add(payload);
		});
	}

	get_quotes() {
		return this.database().then(database => {
			return new Promise((resolve, reject) => {
				database()
					.collection(database_quotes)
					.get()
					.then(snapshot => {
						if (!snapshot.empty) {
							const quotes = [];
							snapshot.forEach(doc => {
								quotes.push({
									id: doc.id,
									...doc.data()
								});
							});

							resolve(quotes);
						} else {
							reject(null);
						}
					});
			});
		});
	}

	get_quote(id) {
		return this.database().then(database => {
			return new Promise((resolve, reject) => {
				database()
					.collection(database_quotes)
					.doc(id)
					.onSnapshot(doc => {
						if (doc.exists) {
							resolve(doc.data());
						} else {
							reject(null);
						}
					});
			});
		});
	}

	add_comment(id, payload, merge = false) {
		return this.database().then(database => {
			const timestamp = new Date().getTime();

			return database()
				.collection(database_comments)
				.doc(id)
				.collection(timestamp.toString())
				.doc()
				.set(payload, { merge: merge });
		});
	}
}

export default new API(
	importAuth,
	importDatabase,
	importStorage
);
