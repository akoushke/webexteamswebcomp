import Adapter from './Adapter';

import api from '../data/api';

export default class APIAdapter extends Adapter {
  async getPerson(id) {
    const person = await api.getPerson(id);
    
    // Shape the data to the way the smart component needs
    return {
      ...person, 
      src: person.avatar,
      status: person.status === 'DoNotDisturb' ? 'dnd' : person.status
    };
  }
}



