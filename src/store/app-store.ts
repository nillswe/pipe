import {devices} from '@/constants/devices'
import {Device} from '@/domain/models'
import {isChrome} from '@/platforms'
import {makeAutoObservable} from 'mobx'

export class AppStore {
  url: Record<string, string> = {}
  devices: Device[] = []

  isSynLocationOn: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  initAllUrl(url: string) {
    this.devices.forEach(device => {
      this.setUrl(url, device.id)
    })
  }

  setUrl(url: string, id: string) {
    this.url = {...this.url, [id]: url}
  }

  private setDevices(devices: Device[]) {
    this.devices = devices
  }

  initialize() {
    return new Promise(resolve => {
      const defaultDevices = devices.filter(device => device?.default)
      this.setDevices(defaultDevices)

      if (isChrome()) {
        this.initAllUrl(window.location.href)
      }
      return resolve(true)
    })
  }

  addDevice(device: Device) {
    this.devices = [...this.devices, device]
  }

  removeDevice(device: Device) {
    this.devices = this.devices.filter(elem => elem.id !== device.id)
  }

  reset() {
    this.initAllUrl('')
    this.devices = []
  }
}

export const appStore = new AppStore()
