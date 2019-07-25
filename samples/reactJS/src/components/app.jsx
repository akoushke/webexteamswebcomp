import '@babel/polyfill';
import './app.css';
import '../../../../src/webComponents/avatar';
import h from "./../../../../src/webComponents/wrapper";



import React, {Component} from 'react';

export default class ReactApp extends Component {
  constructor() {
    super();

    this.state = {
      mySrc: 'https://8e325148c33e40909d40-0b990d1d119de8e505829619be483465.ssl.cf1.rackcdn.com/V1~47c32d0b-0444-460d-8bce-2265b501aac5~bfc8719afb284d998b25362fbffc7d43~1600',
      obj: {
        x: 1
      }
    };
  }

  render() {

    return(
      <div className='parent-container'>
        <web-comp-avatar 
          src={this.state.mySrc} 
          obj={this.state.obj} 
        />
      </div>
    );
  }
}