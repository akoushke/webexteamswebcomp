import {Footer, List, ListItem, SocialList } from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import './footer.css';

export class SocialListDefault extends React.PureComponent {
  render() {
    return (
      <SocialList>
        <List tabType="horizontal" className="social-list">
          <ListItem>
            <i className="icon icon-facebook-circle_40" />
          </ListItem>
          <ListItem>
            <i className="icon icon-twitter-circle_40" />
          </ListItem>
          <ListItem>
            <i className="icon icon-linkedin-circle_40" />
          </ListItem>
        </List>
      </SocialList>
    );
  }
}

export default class WebexTeamsFooter extends HTMLElement {
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
    let props = {
      ...this.getProps(this.attributes, Footer.propTypes)
    };
    props = {
      ...props,
      social: <SocialListDefault/>,
      copyright:'@ 2019 Cisco. All rights reserved',
      className: 'footer'
    }

    ReactDOM.render(
      <Footer
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

window.customElements.define('wbx-tms-footer', WebexTeamsFooter);