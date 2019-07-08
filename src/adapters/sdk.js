import qs from 'qs';
import '@webex/plugin-people';
import '@webex/internal-plugin-mercury';
import '@webex/plugin-people';
import {base64} from '@webex/common';
import SparkCore from '@webex/webex-core';
import {createStore} from 'redux';
import axios from 'axios';

class WebexTeams {
	constructor() {
		this.token = 'ZjU2YmY2YjEtMzQ2NC00ZjRlLTgxZmEtNjhjZGU0OWEwNzgyZjFjZGVhMTItMzYz_PF84_consumer';
		this.getPerson = this.getPerson.bind(this);
		this.initializeSDK();
	}


	 initializeSDK() {
    const sdkConfig = {
      config: {
        appName: 'Webex Teams Web Components'
      },
      credentials: {
        access_token: this.token
      }
    };

		this.sdk = new SparkCore(sdkConfig);
		this.sdk.internal.device.register()
		this.sdk.internal.mercury.connect();
		this.listenTyping();
		this.listenNotTyping();
		this.store = createStore(this.createReducer.bind(this));
	}
	
	listenTyping() {
		this.sdk.internal.mercury.on(
			'event:status.start_typing',
			event => {
				this.store.dispatch({
					type: 'TYPING',
					payload: event.data.actor.id
				});
			}
		);
	}

	listenNotTyping() {
		this.sdk.internal.mercury.on(
			'event:status.stop_typing',
			event => {
				this.store.dispatch({
					type: 'NOT_TYPING',
					payload: event.data.actor.id
				});
			}
		);
	}

	async getPerson(id) {
		let person = null;
		const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    };

		try {
			person = await axios.get(`https://api.ciscospark.com/v1/people/${id}`, options);
	
		}
		catch (error) {
			console.error(error);
		}
	
		return person.data;
	}

	async createReducer(state = {}, action)  {
		switch(action.type) {
			case 'TYPING':
				return Object.assign({}, state, {
					status: 'typing'
				});
				break;
			case 'NOT_TYPING':
				return Object.assign({}, state, {
					status: undefined
				});
				break;
			case 'PERSON_DETAILS':
				const person = await this.getPerson(action.payload.id);
				return Object.assign({}, state, {
					email: person.emails[0],
					src: person.avatar,
					status: person.status
				})
				break;
			default:
				return state;
		}
	}
}



export default new WebexTeams();
