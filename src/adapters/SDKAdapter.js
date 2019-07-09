import sdk from '../data/sdk';

export default class SDKAdapter {
  constructor(callback) {
    sdk.store.subscribe(async () => {
      const person = await sdk.store.getState();
      callback(person);
    });
  }

  getPerson(id) {
    sdk.store.dispatch({
      type: 'PERSON_DETAILS',
      payload: {
        id: id
      }
    });
  }

  disconnect() {
    sdk.disconnect();
  }
}



