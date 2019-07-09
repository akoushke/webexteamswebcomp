import {Button, Icon} from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import template from './app.html';
import './app.css';

export default class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    ReactDOM.render(
      <Button
        children={<Icon name='icon-search_12' />}
        onClick={() => { }}
        ariaLabel='For the Win'
        circle
      />, this);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
 }	
}

window.customElements.define('wbx-tms-app', App);