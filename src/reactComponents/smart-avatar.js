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
    this.state = {
      person: undefined
    };

    this.updatePerson = this.updatePerson.bind(this);
  }

  componentDidMount() {
    this.adapter
      .getPerson(this.personID, this.updatePerson)
      .then(this.updatePerson);
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