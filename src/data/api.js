import '@webex/plugin-people';
import '@webex/internal-plugin-mercury';
import '@webex/plugin-people';
import axios from 'axios';

class WebexTeamsAPI {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.ciscospark.com/v1',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'authorization':  `Bearer ${process.env.MY_TOKEN}`
      }
    });

  }

  async getPerson(id) {
    let person = null;

     try {
      person = await this.axiosInstance.get(`/people/${id}`);

     }
    catch (error) {
      console.error(error);
    }

     return person.data;
  }
}

export default new WebexTeamsAPI();
