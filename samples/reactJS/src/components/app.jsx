import '@babel/polyfill';
import './app.css';
import '../../../../web-components';
import React, {Component} from 'react';

export default class ReactApp extends Component {
  constructor() {
    super();
  }

  render() {
    return `I like to be annoying and incompatible with other framework!` ;
  }
}