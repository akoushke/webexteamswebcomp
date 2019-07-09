import json from '../data/json';

export default class JSONAdapter {
  constructor(mount) {
    this.mount = mount;
  }

  async getPerson(id) {
    const person = await json.getPerson(id);
    
    this.mount(person);
  }
}



