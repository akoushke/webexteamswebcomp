import qs from 'qs';
import '@webex/plugin-people';
import '@webex/internal-plugin-mercury';
import '@webex/plugin-people';
import {base64} from '@webex/common';
import SparkCore from '@webex/webex-core';
import {createStore} from 'redux';
import axios from 'axios';

class WebexTeamsAPI {
	constructor() {
		this.token = 'Bearer NjgzNWVjMWItYjMyOS00NWIzLTg0MTctNjhkMzRlODE3ZjczMDZmZWJiNTktYjk3_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
		this.axiosInstance = axios.create({
			baseURL: 'https://api.ciscospark.com/v1',
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
				'authorization':  this.token
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
