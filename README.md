# momentum-ui Web Components
Library of moementum-ui web components. This library contains all of the converted react components into web components offered by [momentum-ui](https://github.com/momentum-design/momentum-ui).

## Getting Started
  * clone the project
  * `nvm use`
  * `npm i`

  ### Angular
  * npm run start:angular

  ### React
  Unfortunately, React is one of the worst support (among the great frameworks) for using web components inside of the React framework. Please, look at the following links:

https://reactjs.org/docs/web-components.html

https://custom-elements-everywhere.com/libraries/react/results/results.html

https://github.com/facebook/react/issues/11347

https://addyosmani.com/blog/component-interop-with-react-and-custom-elements/

What does it mean? React only passes string values, and only as attributes (not as properties). You can't pass a function to custom property (it will be serialized to string value). in the future we might come up with some sort of wrappers to transfer the properties properly from the react framework.
 
## To-Do Items
 1 - This must become compatible with React
 2 - Come up with some sort of error handler for the undefined components
 3 - Jest Unit testing

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Arash Koushkebaghi** - *Initial work* - [akoushke](https://github.com/akoushke)

## License

MIT

## Acknowledgments

* [David Hoff](https://github.com/harborhoffer) who encouraged me to keep working on this idea