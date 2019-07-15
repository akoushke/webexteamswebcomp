import React from 'react';
import SDKAdapter from '../adapters/SDKAdapter';
import './alert';

export default class WebexTeamsSmartAlerts extends HTMLElement {
	constructor() {
		super();
    this.observer = new MutationObserver(() => this.mount());
		this.observer.observe(this, {attributes: true});
		this.alerts = document.createElement('div');
		this.adapter = new SDKAdapter();
	}

  connectedCallback() {
		this.getPersonSubscription = this.adapter.ListenToIncomingMessage().subscribe(
			(message) => {
				const alert = this.createAlert(message.title, message.message);
				this.mount(alert);
			},
			(error) => console.error(error),
			() => {} // subscription has been completed!
		);
  }
	
	disconnectedCallback() {
		this.observer.disconnect();
	}	

	createAlert(title, message) {
		return `<wbx-tms-alert title=${title} message=${message} show=${true} />`;
	}

	mount(alert) { 
		if(alert) {
			const alertDiv = document.createElement('div');
			alertDiv.innerHTML = alert;
			this.appendChild(alertDiv);
		}
	}
}


window.customElements.define('wbx-tms-smart-alerts', WebexTeamsSmartAlerts);