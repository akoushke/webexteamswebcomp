import '@babel/polyfill';
import './app.css';
import '../../../../src/webComponents/avatar';
import '../../../../src/webComponents/smart-avatar';
import React, {Component} from 'react';
import SmartWebexTeamsAvatar from '../../../../src/reactComponents/smart-avatar';
import { ToggleSwitch } from '@momentum-ui/react';


export default class ReactApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayWC: false,
      personID: 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU'
    };
  }

  getWCSmartAvatar() {
    return (
      <div className='container'>
        <h1> Smart Web Components </h1>
        <h3> API Adapter </h3>
        <wbx-tms-smart-avatar personID={this.state.personID} adapter='API' />
        <h3> SDK Adapter </h3>
        <wbx-tms-smart-avatar personID={this.state.personID} adapter='SDK' />
        <h3> JSON Adapter</h3>
        <wbx-tms-smart-avatar personID={this.state.personID} adapter='JSON'/>
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
        <SmartWebexTeamsAvatar personID={this.state.personID} adapter='API' />
        <h3> SDK Adapter </h3>
        <SmartWebexTeamsAvatar personID={this.state.personID} adapter='SDK' />
        <h3> JSON Adapter</h3>
        <SmartWebexTeamsAvatar personID={this.state.personID} adapter='JSON'/>
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
        <div className='toggle-container'>
          <label> Smart React Components </label>
          <ToggleSwitch 
            checked={this.state.displayWC}
            onChange={this.checkHandler.bind(this)}
            htmlId='toggleSwitch'
          />
          <label> Smart Web Components </label>
        </div>
        {this.state.displayWC && this.getWCAvatar()}
        {this.state.displayWC && this.getWCSmartAvatar()}
        {!this.state.displayWC && this.getReactSmartAvatar()}
      </div
    >);

  }
}