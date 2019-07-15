import {Topbar, Popover } from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './smart-avatar';
export class PopOver extends React.Component {
  constructor() {
    super();
    this.personID = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU';
  }

  render() {
    return(
      <Popover
        checkOverflow
        content={
        <div 
          key="1" 
          style={
            {
              display:'flex',
              justifyContent:'center',
              alignItems: 'center', 
              flexDirection: 'column',
              color: 'black', 
              width: '12rem' 
            }
            }
        >
          <h3>Arash Koushkebaghi</h3>
          <h4>akoushke@cisco.com</h4>
        </div>}
        direction={'bottom-right'}
        popoverTrigger={'Click'}
        targetOffset={{ horizontal: -10 }}
      >
        <wbx-tms-smart-avatar style={{"paddingRight":"1rem"}}
              personID={this.personID} 
              adapter='SDK' 
          />
      </Popover>
    );
  }
}

export default class WebexTeamsTopBar extends HTMLElement {
  constructor() {
    super();
    this.observer = new MutationObserver(() => this.mount());
    this.observer.observe(this, {attributes: true});
    this.personID = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU'
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
    let props = {
      ...this.getProps(this.attributes, Topbar.propTypes)
    };
    props = {
      ...props,
      children: <PopOver />
    }

    ReactDOM.render(
      <Topbar
        {...props}
      />, this)
  }
  
  unmount(){
    ReactDOM.unmountComponentAtNode(this);
  }

  disconnectedCallback() {
    this.unmount();	
    this.observer.disconnect();
  }	
}

window.customElements.define('wbx-tms-top-bar', WebexTeamsTopBar);