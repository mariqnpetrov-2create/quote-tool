import {
	importAuth,
	importDatabase,
	importStorage
} from './firebase';

const database_users = 'users';
const database_quotes = 'quotes';
const database_main_comments = 'main-comments';
const database_sub_comments = 'sub-comments';

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

		this.database()
			.then(database => {
				database()
					.collection(database_users)
					.doc(user.uid)
					.update(payload)
				});
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

	delete_quote(id, imageURL) {
		return this.database().then(database => {
			return new Promise((resolve, reject) => {
				this.delete_comments(id);

				database()
					.collection(database_quotes)
					.doc(id)
					.delete()
					.then( () => {
						this.storage().then( storage => {
							const imageRef = storage().refFromURL(imageURL);

							imageRef.delete();

							resolve();
						})
						.catch(err => {
							reject(err);
						});
					});
			});
		});
	}

	delete_comments(id) {
		return this.database().then(database => {
			return new Promise((resolve, reject) => {
				const query = database()
					.collection(database_main_comments)
					.doc(id)
					.collection('comments')
					.get();

				const batch = database().batch();

				query.then(snapshot => {
					snapshot.forEach(doc => {
						batch.delete(doc.ref);
					});

					batch.commit()
				});

				database()
					.collection(database_main_comments)
					.doc(id)
					.delete();
			});
		});
	}

    toggle_approve_quote(id, isApproved) {
        return this.database().then(database => {
            return new Promise((resolve, reject) => {
                database()
                    .collection(database_quotes)
                    .doc(id)
                    .update({
                        approved: isApproved
                    });
            });
        });
    }

	add_comment(id, payload) {
		return this.database().then(database => {
			const timestamp = database.Timestamp.now().toMillis();

			payload.date = timestamp;

			return database()
				.collection(database_main_comments)
				.doc(id)
				.collection('comments')
				.add(payload);
		});
	}

	add_sub_comment(id, payload, commentId) {
		return this.database().then(database => {
			const timestamp = database.Timestamp.now().toMillis();

			payload.date = timestamp;

			return database()
				.collection(database_main_comments)
				.doc(id)
				.collection('comments')
				.doc(commentId)
				.collection('subcomments')
				.add(payload);
		});
	}

	get_comments(id) {
		return this.database().then(database => {
			database()
				.collection(database_main_comments)
				.doc(id)
				.onSnapshot(doc => {
					if (doc.exists) {
						resolve(doc.data());
					} else {
						reject(null);
					}
				});
		});
	}

	toggle_like(id, likedBy) {
		return this.database().then(database => {
			database()
				.collection(database_quotes)
				.doc(id)
				.update({
					likedBy
				});
		});
	}
}


export default new API(
	importAuth,
	importDatabase,
	importStorage
);
