import Adapter from './Adapter';
import {Observable} from 'rxjs';

import sdk from '../data/sdk';

export default class SDKAdapter extends Adapter {
  getPerson(id) {
    const observable = new Observable(observer => {
      sdk.store.subscribe(() => {
        observer.next(sdk.store.getState());
      });
    });

    sdk.getPerson(id);
    return observable;
  }
}



