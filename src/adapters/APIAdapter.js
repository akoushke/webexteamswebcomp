import Adapter from './Adapter';

import api from '../data/api';

export default class APIAdapter extends Adapter {
  async getPerson(id, onUpdate) {
    let person = await api.getPerson(id);
    
    // Fake an update 5 seconds later
    setInterval(() => {
      person.status = person.status === 'dnd' ? 'active' : 'dnd';
      onUpdate(person);
    }, 5000);

    // Shape the data to the way the smart component needs
    person.src = person.avatar;
    person.status = person.status === 'DoNotDisturb' ? 'dnd' : person.status;

    return person;
  }
}



