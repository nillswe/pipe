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

  removeDevice(device: Device) {
    this.devices = this.devices.filter(elem => elem.id !== device.id)
  }

  reset() {
    this.setUrl('')
    this.devices = []
  }
}

export const appStore = new AppStore()
