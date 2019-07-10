# Webex Teams Smart Web Component Demo
Simple and short demo of wrapping cisco styled standard components, AKA [momentum-ui](https://github.com/momentum-design/momentum-ui) react component into a web component to be bound to `Webex Teams data provider`. This demo contains two types of web components:

    1 - Basic Web Components
    2 - Smart Web Components

`Basic Components` are just set of wrappers for converting the react momentum-ui components into web components.

`Smart Components` are `Basic Components` in addtion to the data provider/adapter.

Moreover, this project contain another type of components as `Smart React Components` where the resulted components are combination of momentum-ui react component bounded to the data providers.

## Getting Started

  * clone the project
  * `nvm use`
  * `npm i`
  * create an `.env` file to store your token as an environment variable
    ```
    MY_TOKEN='<YOUR TOKEN>'
    ```
  * npm start

### Prerequisites

  * node `v12.4.0`
  * nvm  `v0.34.0`
## Built With

* [Web Component](https://www.webcomponents.org/introduction) - used as a main framework
* [ReactJS](https://reactjs.org) - used as an additional third party framework
* [Webpack](https://webpack.js.org/) - Used to compile, serve and bundle the application

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Arash Koushkebaghi** - *Initial work* - [akoushke](https://github.com/akoushke)
* **Adam Weeks** - *Additional work* - [adamweeks](https://github.com/adamweeks)

## License

MIT

## Acknowledgments

* [David Hoff](https://github.com/harborhoffer) who encouraged me to keep working on this idea