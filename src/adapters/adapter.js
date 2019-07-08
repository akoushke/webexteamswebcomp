import sdk from './sdk';

export default class Adapter {
	constructor(callback) {
		sdk.store.subscribe(async () => {
			const person = await sdk.store.getState();
			callback(person);
		});
	}

	getPerson(id, callback) {
		sdk.store.dispatch({
			type: 'PERSON_DETAILS',
			payload: {
				id: id
			}
		});
	}
}