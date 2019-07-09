import api from '../data/api';

export default class APIAdapter {
  constructor(callback) {
    this.callback = callback;
  }

  async getPerson(id) {
    const person = await api.getPerson(id);
    this.callback(
      {...person, 
       src: person.avatar,
       status: person.status === 'DoNotDisturb' ? 'dnd' : person.status});
  }
}



