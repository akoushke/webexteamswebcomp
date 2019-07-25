import { define, render, property } from 'hybrids';
import {Avatar} from '@momentum-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';




// function reactify(fn) {
//   return render(
//     (host) => {
//       const Component = fn(host);
//       return (host, target) => ReactDOM.render(Component, target);
//     },
//     { shadowRoot: false },
//   );
// }

const WCAvatar = {
  src: property('src'),
  obj: property({}),
  render: render((host) => {
    console.log(host.obj)
    return (host, target) => {
      ReactDOM.render(<Avatar src={host.src}/>, target)
    }
  },  { shadowRoot: false })
};

define('web-comp-avatar', WCAvatar);