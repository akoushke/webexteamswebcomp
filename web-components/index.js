import {define, render} from 'hybrids';
import * as Components from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

// Grab all of the momentum-ui react components
Object.keys(Components).forEach(key => {
  // Convert the PascalCase string with lowercase string plus dashes in between
  const name = `web-comp${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
  // register the new web component with the new name
  define(name, 
  {
    render: render(() => {
      // Grab the react component whenever being invoked
      const Component = Components[key];

      return (host, target) => {
        // Render the component with the given properties
        ReactDOM.render(<Component {...host} />, target)
      }
    },  { shadowRoot: false }) // No to Shadow DOM
  });
})
