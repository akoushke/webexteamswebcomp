import '@babel/polyfill';
import React, {Component} from 'react';
import {Avatar} from '@momentum-ui/react';
import ReactDOM from 'react-dom';

import SDKAdapter from '../adapters/SDKAdapter';
import APIAdapter from '../adapters/APIAdapter';
import JSONAdapter from '../adapters/JSONAdapter';

export default class SmartWebexTeamsAvatar extends Component {
	constructor(props) {
		super(props);

		this.personID = props.personID;
		this.adapterType = props.adapter;
		this.state = {
			person: undefined
		};
	}

	componentWillMount() {
		this.selectAdapter();
	}

	selectAdapter() {
		switch(this.adapterType) {
			case 'API':
				const api = new APIAdapter(this.updatePerson.bind(this));
				
				api.getPerson(this.personID);
				break;

			case 'SDK':
				const sdk = new SDKAdapter(this.updatePerson.bind(this));
				
				sdk.getPerson(this.personID);
				break;

			case 'JSON':
				const json = new JSONAdapter(this.updatePerson.bind(this));
				
				json.getPerson(this.personID);
				break;
			
			default:
				console.error('Invalid Adapter Type. Valid Types are [API, SDK, JSON]');
		}
	}

	updatePerson(person) {
		this.setState({
			person
		});
	}

	render() {
		let app = null;
		const {person} = this.state;

		if(person) {
			app =
				(<Avatar
					src={person.src} 
					type={person.status}
				/>)
		}	

		return app;
	}
}