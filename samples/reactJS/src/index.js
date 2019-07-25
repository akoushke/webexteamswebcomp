import './momentum-ui.scss';
import '@babel/polyfill';
// import "@webcomponents/webcomponentsjs/webcomponents-bundle";

import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import React from 'react';
import ReactApp from './components/app.jsx';
import ReactDOM from 'react-dom';

ReactDOM.render(<ReactApp />, document.getElementById('root'));