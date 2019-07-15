import '@babel/polyfill';
import './app.css';
import '../../../../src/webComponents/avatar';
import '../../../../src/webComponents/footer';
import '../../../../src/webComponents/topBar';
import '../../../../src/webComponents/smart-avatar';
import '../../../../src/webComponents/smart-alert';

import React, {Component} from 'react';

import SmartWebexTeamsAvatar from '../../../../src/reactComponents/smart-avatar';

// Adapters
import APIAdapter from '../../../../src/adapters/APIAdapter';
import JSONAdapter from '../../../../src/adapters/JSONAdapter';
import SDKAdapter from '../../../../src/adapters/SDKAdapter';


export default class ReactApp extends Component {
  constructor(props) {
    super(props);

    this.personID = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU'
    this.state = {
      displayWC: false,
    };

    this.APIAdapter = new APIAdapter();
    this.JSONAdapter = new JSONAdapter();
    this.SDKAdapter = new SDKAdapter();
  }

  getWCSmartAvatar() {
    return (
      <div className='container'>
        <h1> Smart Web Components </h1>
        <h3> API Adapter </h3>
        <wbx-tms-smart-avatar personID={this.personID} adapter='API' />
        <h3> SDK Adapter </h3>
        <wbx-tms-smart-avatar personID={this.personID} adapter='SDK' />
        <h3> JSON Adapter</h3>
        <wbx-tms-smart-avatar personID={this.personID} adapter='JSON'/>
      </div>
    );
  }

  getWCAvatar() {
    return (
    <div className='container'>
      <h1> Basic Web Components </h1>
      <wbx-tms-avatar src='https://8e325148c33e40909d40-0b990d1d119de8e505829619be483465.ssl.cf1.rackcdn.com/V1~47c32d0b-0444-460d-8bce-2265b501aac5~bfc8719afb284d998b25362fbffc7d43~1600'/>
    </div>
    );
  }

  getReactSmartAvatar() {
    return (
      <div className='container'>
        <h1> Smart React Components </h1>
        <h3> API Adapter </h3>
        <SmartWebexTeamsAvatar personID={this.personID} adapter={this.APIAdapter} />
        <h3> SDK Adapter </h3>
        <SmartWebexTeamsAvatar personID={this.personID} adapter={this.SDKAdapter} />
        <h3> JSON Adapter</h3>
        <SmartWebexTeamsAvatar personID={this.personID} adapter={this.JSONAdapter} />
      </div>
    );
  }
  
  checkHandler() {
    this.setState({
      displayWC: !this.state.displayWC
    });
  }

  render() {
    return(
      <div className='parent-container'>
         <wbx-tms-top-bar />
         <wbx-tms-smart-alerts />
         <wbx-tms-footer className='footer'/>
      </div>
    );

  }
}