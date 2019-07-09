import '@babel/polyfill';
import App from './webComponents/app/app';


import './momentum-ui.scss';

class Index extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const app = new App();
    this.appendChild(app);
  }
}

window.customElements.define('wbx-tms-index', Index);