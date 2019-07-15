import '@webex/plugin-people';
import '@webex/plugin-messages';
import '@webex/plugin-messages';
import '@webex/internal-plugin-mercury';
import SparkCore from '@webex/webex-core';
import {createStore} from 'redux';
import axios from 'axios';


const WebexTeamsURI = 'ciscospark://us';

class WebexTeamsSDK {
  constructor() {
    this.getPerson = this.getPerson.bind(this);
    this.initializeSDK();
    this.axiosInstance = axios.create({
      baseURL: 'https://api.ciscospark.com/v1',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
        'authorization':  `Bearer ${process.env.MY_TOKEN}`
      }
    });
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
    this.addIncomingMessageListener();
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

   addIncomingMessageListener() {
    // Listen for new messages being sent to the room
    this.sdk.internal.mercury.on(
      'event:conversation.activity',
      async (event) => {
        const uuid = this.getRoomUUID('Y2lzY29zcGFyazovL3VzL1JPT00vMGNiOTQxZjAtNmRmYS0xMWU5LWEzYWItZDc0M2RlMjkxOWVm');

        // To retrieve messages for a targeted room and only when there is a new message
        if(event.data.activity.target.id === uuid && event.data.activity.verb === 'post') {
          const message = await this.getMessage(this.getMessageID(event.data.activity.id));
          const payload = {
            personName: event.data.activity.actor.displayName,
            text: message.text
          };
          
          this.store.dispatch({
            type: 'NEW_MESSAGE',
            payload
          })
        }
    });
  }

  /**
   * Encodes the roomID into base64 format and return the UUID
   */
  getRoomUUID(roomId) {
    return atob(roomId).split('/')[4];
  }

  /**
   * Decodes the entry UUID into a valid personID
   */
  getPersonID(personUUID) {
    // Remove `=` from the end
    return btoa(`${WebexTeamsURI}/PEOPLE/${personUUID}`).slice(0, -1);
  }

  /**
   * Decodes the entry UUID into a valid messageID
   */
  getMessageID(messageUUID) {
    return btoa(`${WebexTeamsURI}/MESSAGE/${messageUUID}`);
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
      throw Error(error.message);
    }

    this.store.dispatch({
      type: 'PERSON_DETAILS',
      payload: {
        src: person.avatar,
        status: 'active'
      }
    });
  }


  async getMessage(id) {
    let message = null;

    try {
      message = await this.sdk.messages.get(id);
    }
    catch(error) {
      throw Error(error.message);
    }

    return message;
  }

  connect() {
    this.sdk.internal.device.register()
    this.sdk.internal.mercury.connect();
  }

  disconnect() {
    this.sdk.internal.mercury.disconnect();
    this.sdk.internal.device.unregister();
  }

  createReducer(state = {}, action)  {
    
    switch(action.type) {
      case 'STATUS_UPDATE':
        return Object.assign({}, state, {
          type: 'PERSON',
          src:  state.src,
          status: action.payload
        });
      case 'PERSON_DETAILS':
        return Object.assign({}, state, {
          type: 'PERSON',
          src: action.payload.src,
          status: action.payload.status
        })
      case  'NEW_MESSAGE':
        return Object.assign({}, state, {
          type: 'MESSAGE',
          title: action.payload.personName.replace(/\s/g, '\xa0'),
          message: action.payload.text.replace(/\s/g, '\xa0')
        })
      default:
        return state;
    }
  }
}

export default new WebexTeamsSDK();