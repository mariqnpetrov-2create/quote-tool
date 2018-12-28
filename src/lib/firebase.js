/**
 * Lazy load firebase auth module
 *
 * @return {Promise}
 */
export const importAuth = async () => {
	const { default: firebase} = await import('firebase/app');

	await import('firebase/auth');

	return firebase.auth;
};

/**
 * Lazy load firebase database module
 *
 * @return {Promise}
 */
export const importDatabase = async () => {
    const { default: firebase } = await import(/* webpackChunkName: 'firebase-[app]' */ 'firebase/app');
    await import(/* webpackChunkName: 'firebase-[database]' */ 'firebase/firestore');

    await firebase.firestore().settings({
        timestampsInSnapshots: true
    });

    return firebase.firestore;
};

export const importStorage = async () => {
	const { default: firebase} = await import('firebase/app');

	await import('firebase/storage');

	return firebase.storage;
};
