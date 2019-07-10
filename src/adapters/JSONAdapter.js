import Adapter from './Adapter';

import json from '../data/json';

export default class JSONAdapter extends Adapter {
  async getPerson(id) {
    const person = await json.getPerson(id);
    
    return person;
  }
}



