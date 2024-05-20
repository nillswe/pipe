import {makeObservable} from 'mobx'

export class AppStore {
  constructor() {
    makeObservable(this)
  }
}
