import person from './person';

class WebexTeamsAPI {
  constructor() {}

  async getPerson() {
     return person;
  }
}

export default new WebexTeamsAPI();
