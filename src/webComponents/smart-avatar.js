import React from 'react';
import ReactDOM from 'react-dom';
import SDKAdapter from '../adapters/SDKAdapter';
import APIAdapter from '../adapters/APIAdapter';
import JSONAdapter from '../adapters/JSONAdapter';
import './avatar';

export default class SmartWebexTeamsAvatar extends HTMLElement {
  constructor() {
    super();
    this.observer = new MutationObserver(() => this.mount());
    this.observer.observe(this, {attributes: true});
  }

  connectedCallback() {
    const personID = this.attributes.personID.value;
    const adapterType = this.attributes.adapter.value;

    this.selectAdapter(adapterType, personID);
  }

  selectAdapter(adapterType, personID) {
    switch(adapterType) {
      case 'API':
        const api = new APIAdapter(this.mount.bind(this));
        
        api.getPerson(personID);
        break;

      case 'SDK':
        const sdk = new SDKAdapter(this.mount.bind(this));
        
        sdk.getPerson(personID);
        break;

      case 'JSON':
        const json = new JSONAdapter(this.mount.bind(this));
        
        json.getPerson(personID);
        break;
      
      default:
        console.error('Invalid Adapter Type. Valid Types are [API, SDK, JSON]');
    }
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