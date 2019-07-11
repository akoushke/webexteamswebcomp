import Adapter from './Adapter';
import {Observable} from 'rxjs';

import sdk from '../data/sdk';

export default class SDKAdapter extends Adapter {
  getPerson(id) {
    sdk.getPerson(id);


    return new Observable(observer => {
      // Push the initial value to render
      observer.next(sdk.store.getState());

      // Also push any changes to re-render 
      sdk.store.subscribe(() => {
        observer.next(sdk.store.getState());
      })
    })
  }
}



