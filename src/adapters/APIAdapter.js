import Adapter from './Adapter';
import {from} from 'rxjs';
import {map} from 'rxjs/operators';

import api from '../data/api';

export default class APIAdapter extends Adapter {
  getPerson(id) {
    const observable = from(api.getPerson(id));

    return observable.pipe(map(person => {
      // Shape the data to the way the smart component needs
      return {
        ...person, 
        src: person.avatar,
        status: person.status === 'DoNotDisturb' ? 'dnd' : person.status
      };
    }));
  }
}



