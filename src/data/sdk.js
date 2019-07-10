import '@webex/plugin-people';
import '@webex/internal-plugin-mercury';
import '@webex/plugin-people';
import SparkCore from '@webex/webex-core';
import {createStore} from 'redux';

class WebexTeamsSDK {
  constructor() {
    this.getPerson = this.getPerson.bind(this);
    this.initializeSDK();
  }


   initializeSDK() {
    const sdkConfig = {
      config: {
        appName: 'Webex Teams Web Components'
      },
      credentials: {
        access_token: process.env.MY_TOKEN
      }
    };

    this.sdk = new SparkCore(sdkConfig);
    this.connect();
    this.listenToPersonStatusChanges();
    this.store = createStore(this.createReducer.bind(this));
  }
  
  listenToPersonStatusChanges() {
    this.sdk.internal.mercury.on(
      'event:apheleia.subscription_update',
      event => {
        this.store.dispatch({
          type: 'STATUS_UPDATE',
          payload: event.data.status
        });
      }
    );
  }

  async getPerson(id) {
      let person = null;
  
      try {
        const people = await this.sdk.people.list({id});
  
        if (!!people.items && people.items.length > 0) {
          [person] = people.items;
        }
      }
      catch (error) {
        console.error(error);
      }
  
      return person;
  }

  connect() {
    this.sdk.internal.device.register()
    this.sdk.internal.mercury.connect();
  }

  disconnect() {
    this.sdk.internal.mercury.disconnect();
    this.sdk.internal.device.unregister();
  }

  async createReducer(state = {}, action)  {
    
    switch(action.type) {
      case 'STATUS_UPDATE':
        state = await state;
        return Object.assign({}, state, {
          src:  state.src,
          status: action.payload
        });
      case 'PERSON_DETAILS':
        const person = await this.getPerson(action.payload.id);
        return Object.assign({}, state, {
          src: person.avatar,
          status: 'active'
        })
      default:
        return state;
    }
  }
}

export default new WebexTeamsSDK();
