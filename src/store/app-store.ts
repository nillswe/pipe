'use client'

import {Device} from '@/types'
import {makeAutoObservable} from 'mobx'

export class AppStore {
  url: string = ''
  devices: Device[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setUrl(url: string) {
    this.url = url
  }

  addDevice(device: Device) {
    this.devices.push(device)
  }
}

export const appStore = new AppStore()
