import json from '../data/json';

export default class JSONAdapter {
  constructor(callback) {
    this.callback = callback;
  }

  async getPerson(id) {
    const person = await json.getPerson(id);
    
    this.callback(person);
  }
}



