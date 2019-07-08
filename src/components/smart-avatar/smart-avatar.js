import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from '../../adapters/adapter';
import '../avatar/avatar';

export default class SmartWebexTeamsAvatar extends HTMLElement {
	constructor() {
		super();
		this.adapter = new Adapter(this.mount.bind(this));
		this.observer = new MutationObserver(() => this.mount());
		this.observer.observe(this, {attributes: true});
	}

	connectedCallback() {
		const personID = this.attributes.personID.value;
		this.adapter.getPerson(personID);
	}

	mount(person) {
		if(person) {
			this.innerHTML = `
				<wbx-tms-avatar 
					src=${person.src} 
					type=${person.status}
				/>
			}`;
		}	
	}
	
	unmount(){
		ReactDOM.unmountComponentAtNode(this);
	}

	disconnectedCallback() { // or adoptedCallback()
		this.unmount();	
	}	
}

window.customElements.define('wbx-tms-smart-avatar', SmartWebexTeamsAvatar);