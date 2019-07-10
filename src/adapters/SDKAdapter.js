import Adapter from './Adapter';

import sdk from '../data/sdk';

export default class SDKAdapter extends Adapter {
  getPerson(id) {
    return new Promise((resolve) => {
      // Subscribe and wait for our reducer
      sdk.store.subscribe(async () => {
        const person = await sdk.store.getState();
        resolve(person);
      });

      // Dispatch the fetch action
      sdk.store.dispatch({
        type: 'PERSON_DETAILS',
        payload: {
          id: id
        }
      });
    });
  }
}



