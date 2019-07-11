/* eslint-disable no-unused-vars */
import {Observable} from 'rxjs';

/**
 * This is the base class that adapters will inherit from.
 * When creating your subclass adapter, make sure all methods
 * are defined and the items returned have the proper shape.
 */
export default class Adapter {

  /**
   * @typedef {Object} PersonObject
   * @property {String} src A url for the person's avatar
   * @property {String} status dnd|ooo|available
   */

  /**
   * 
   * @param {String} id - ID of person to get
   * 
   * @returns {Observable<PersonObject>}
   * @memberof Adapter
   */
  getPerson(id) {
    return new Observable(() => {
        throw new Error('getPerson has not been defined.')
    });
  }
}
