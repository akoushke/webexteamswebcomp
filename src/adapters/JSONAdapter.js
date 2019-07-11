import Adapter from './Adapter';
import {Observable} from 'rxjs';
import json from '../data/json';

export default class JSONAdapter extends Adapter {
  getPerson(id) {
    return new Observable(observer => observer.next(json.getPerson(id)));
  }
}



