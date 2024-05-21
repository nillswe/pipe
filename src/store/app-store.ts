'use client'

import {makeAutoObservable} from 'mobx'

export class AppStore {
  url: string = ''
  constructor() {
    makeAutoObservable(this)
  }

  setUrl(url: string) {
    this.url = url
  }
}

export const appStore = new AppStore()
