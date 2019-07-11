import './avatar';
import APIAdapter from '../adapters/APIAdapter';
import JSONAdapter from '../adapters/JSONAdapter';
import SDKAdapter from '../adapters/SDKAdapter';

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
    let adapter;
    switch(adapterType) {
      case 'API':
        adapter = new APIAdapter();
        break;

      case 'SDK':
        adapter = new SDKAdapter();
        break;

      case 'JSON':
        adapter = new JSONAdapter();
        break;
      
      default:
        console.error('Invalid Adapter Type. Valid Types are [API, SDK, JSON]');
    }
    if (adapter) {
      adapter.getPerson(personID).subscribe(
        (person) => this.mount(person),
        (error) => console.error(error),
        () => {} // subscription has been completed!
      );
    }
  }

  mount(person) {
    if(person && Object.keys(person).length !== 0) {
      this.innerHTML = `
        <wbx-tms-avatar 
          src=${person.src} 
          type=${person.status}
        />
      }`;
    }	
  }
  
  disconnectedCallback() { // or adoptedCallback()
    this.observer.disconnect();	
  }	
}

window.customElements.define('wbx-tms-smart-avatar', SmartWebexTeamsAvatar);