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
    this.adapter = props.adapter;
    this.getPersonSubscription = null;
    this.state = {
      person: undefined
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPersonSubscription = this.adapter.getPerson(this.personID)
      .subscribe(
        person => this.updatePerson(person),
        error => console.error(error),
        () => {} // Subscription had been completed)
      ); 
  }

  componentWillUnmount() {
    this.getPersonSubscription.unsubscribe();
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