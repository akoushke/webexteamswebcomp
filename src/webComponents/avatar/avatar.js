import {Avatar} from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import template from './avatar.html';
import './avatar.css';

export default class WebexTeamsAvatar extends HTMLElement {
	constructor() {
		super();
		this.observer = new MutationObserver(() => this.mount());
		this.observer.observe(this, {attributes: true});
	}

	connectedCallback() {
		this.mount();
	}

	getProps(attributes, propTypes) {
		propTypes = propTypes|| {};
		return [ ...attributes ]         
			 .filter(attr => attr.name !== 'style')         
			 .map(attr => this.convert(propTypes, attr.name, attr.value))
			 .reduce((props, prop) => 
					({ ...props, [prop.name]: prop.value }), {});
 }

 convert(propTypes, attrName, attrValue) {
		const propName = Object.keys(propTypes)
			 .find(key => key.toLowerCase() == attrName);
		let value = attrValue;
		if (attrValue === 'true' || attrValue === 'false') 
			 value = attrValue == 'true';      
		else if (!isNaN(attrValue) && attrValue !== '') 
			 value = +attrValue;      
		else if (/^{.*}/.exec(attrValue)) 
			 value = JSON.parse(attrValue);
		return {         
			 name: propName ? propName : attrName,         
			 value: value      
		};
	}

	mount() {
		const props = {
			...this.getProps(this.attributes, Avatar.propTypes)
		};

		ReactDOM.render(
			<Avatar
				{...props}
			/>, this)
	}
	
	unmount(){
		ReactDOM.unmountComponentAtNode(this);
	}

	disconnectedCallback() { // or adoptedCallback()
		this.unmount();	
		this.observer.disconnect();
	}	
}

window.customElements.define('wbx-tms-avatar', WebexTeamsAvatar);