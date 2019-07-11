import React, {Component} from 'react';
import {Avatar} from '@momentum-ui/react';
import PropTypes from 'prop-types';

const propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.object.isRequired,
};

export default class SmartWebexTeamsAvatar extends Component {
  constructor(props) {
    super(props);

    this.personID = props.personID;
    this._isMounted = false;
    this.adapter = props.adapter;
    this.state = {
      person: undefined
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.adapter.getPerson(this.personID)
      .subscribe(
        person => this.updatePerson(person),
        error => console.error(error),
        () => {} // Subscription had been completed)
      ); 
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updatePerson(person) {
    // Common shared adapters will even change the 
    // state of the unmounted component for this demo
    if(this._isMounted)
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