import {makeAutoObservable} from 'mobx'

export class FitScreenUIStore {
  scale: number = 0.8
  spacesY: number = 80
  constructor() {
    makeAutoObservable(this)
  }

  setScale(scale: number) {
    this.scale = scale
  }

  private calcDeviceHeightWithSpaces(device: Element) {
    return device.clientHeight * this.scale + this.spacesY
  }

  fitToScreen() {
    const screenHeight = window.innerHeight

    const zoomContainer = document.querySelector('#zoom-container')
    const devices = zoomContainer?.children

    if (!devices) return

    let biggestDeviceInHeight = this.calcDeviceHeightWithSpaces(devices[0])

    for (const device of devices) {
      const deviceRealHeight = this.calcDeviceHeightWithSpaces(device)

      if (deviceRealHeight > biggestDeviceInHeight) {
        biggestDeviceInHeight = deviceRealHeight
      }
    }

    const newScale = (screenHeight / biggestDeviceInHeight) * this.scale

    this.setScale(newScale)
  }
}

export const fitScreenUIStore = new FitScreenUIStore()
