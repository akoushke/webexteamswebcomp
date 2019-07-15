import Adapter from './Adapter';
import {Observable, Subject} from 'rxjs';

import sdk from '../data/sdk';

export default class SDKAdapter extends Adapter {
  constructor() {
    super();

    this.personSubject = new Subject();
    this.messageSubject = new Subject();
    this.getState();
  }

  getState() {
    sdk.store.subscribe(() => {
      const newChange = sdk.store.getState();

      if(newChange.type === 'PERSON')
        this.personSubject.next(newChange); 
      else
        this.messageSubject.next(newChange);
    })
  }

  getPerson(id) {
    sdk.getPerson(id);

    return this.personSubject;
  }

  ListenToIncomingMessage() {
    return this.messageSubject;
  }
}



