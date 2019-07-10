import React, {Component} from 'react';
import APIAdapter from '../adapters/APIAdapter';
import {Avatar} from '@momentum-ui/react';
import JSONAdapter from '../adapters/JSONAdapter';
import PropTypes from 'prop-types';
import SDKAdapter from '../adapters/SDKAdapter';

const propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.string.isRequired,
};

export default class SmartWebexTeamsAvatar extends Component {
  constructor(props) {
    super(props);

    this.personID = props.personID;
    this.adapterType = props.adapter;
    this.state = {
      person: undefined
    };
  }

  componentDidMount() {
    this.selectAdapter();
  }

  selectAdapter() {
    switch(this.adapterType) {
      case 'API':
        const api = new APIAdapter(this.updatePerson.bind(this));
        
        api.getPerson(this.personID);
        break;

      case 'SDK':
        const sdk = new SDKAdapter(this.updatePerson.bind(this));
        
        sdk.getPerson(this.personID);
        break;

      case 'JSON':
        const json = new JSONAdapter(this.updatePerson.bind(this));
        
        json.getPerson(this.personID);
        break;
      
      default:
        console.error('Invalid Adapter Type. Valid Types are [API, SDK, JSON]');
    }
  }

  updatePerson(person) {
    this.setState({
      person
    });
  }

  render() {
    let app = null;
    const {person} = this.state;

    if(person) {
      app =
        (<Avatar
          src={person.src} 
          type={person.status}
        />)
    }	

    return app;
  }
}

SmartWebexTeamsAvatar.propTypes = propTypes;