import {autorun, makeAutoObservable} from 'mobx'
import {WheelEvent as ReactWheelEvent} from 'react'

type ViewportPosition = {
  x: number
  y: number
}

type WindowDimensions = {
  width: number
  height: number
}

export class AppUIStore {
  scale: number = 0.8
  screenPaddingY: number = 40
  screenPaddingX: number = 40
  viewportPos: ViewportPosition = {x: 0, y: 0}
  zoom: number = 1
  windowDimensions: WindowDimensions = {width: 0, height: 0}
  screenDimensions: WindowDimensions = {width: 0, height: 0}

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      const {availWidth, availHeight} = window.screen
      this.setScreenDimensions({width: availWidth, height: availHeight})
    })
  }

  setScale(scale: number) {
    this.scale = scale
  }

  setZoom(zoom: number) {
    this.zoom = zoom
  }

  setViewportPos(position: ViewportPosition) {
    this.viewportPos = position
  }

  setScreenDimensions(dimensions: WindowDimensions) {
    this.screenDimensions = dimensions
  }

  private calcDeviceHeightWithSpaces(device: Element) {
    const realDeviceHeight = device.clientHeight * this.scale
    const verticalPaddings = this.screenPaddingY * 2
    return realDeviceHeight + verticalPaddings
  }

  fitToScreen() {
    const screenHeight = window.innerHeight

    const zoomContainer = document.querySelector('#zoom-container')
    const devices = zoomContainer?.children

    if (!devices) return

    let biggestDeviceHeight = this.calcDeviceHeightWithSpaces(devices[0])

    for (const device of devices) {
      const deviceRealHeight = this.calcDeviceHeightWithSpaces(device)

      if (deviceRealHeight > biggestDeviceHeight) {
        biggestDeviceHeight = deviceRealHeight
      }
    }

    const newScale = screenHeight / biggestDeviceHeight

    this.setZoom(Number(newScale.toFixed(2)))
    this.setViewportPos({x: 0, y: 10})
  }

  updateSize() {
    const curPageDimensions = document.body.getBoundingClientRect()

    const percentageWidth =
      curPageDimensions.width / this.screenDimensions.width
    const percentageHeigh =
      curPageDimensions.height / this.screenDimensions.height

    this.setZoom(Math.min(Math.min(percentageWidth, percentageHeigh), 1))

    this.setViewportPos({x: 0, y: 10})
  }

  scrollPage(scroll: WheelEvent) {
    this.setViewportPos({
      x: this.viewportPos.x + scroll.deltaX * -1,
      y: this.viewportPos.y + scroll.deltaY * -1,
    })
  }

  placeScreens() {
    const screens = document.querySelectorAll<HTMLDivElement>('[id^=screen-]')

    screens.forEach((screen, index) => {
      if (index === 0) {
        screen.style.left = `${this.screenPaddingX}px`
      } else {
        const prevScreen = screens[index - 1]
        const newPos =
          prevScreen.offsetLeft +
          prevScreen.offsetWidth * this.scale +
          this.screenPaddingX * this.scale

        screen.style.left = `${newPos}px`
      }
    })
  }

  onZoom = (event: ReactWheelEvent<HTMLElement>) => {
    if (!event.ctrlKey) return

    const ZOOM_SENSITIVITY = 400
    const zoomAmount = -(event.deltaY / ZOOM_SENSITIVITY)
    this.setZoom(Math.max(Math.min(this.zoom + zoomAmount, 2), 0.2))
    this.setViewportPos({x: 0, y: 10})
  }
}

export const appUiStore = new AppUIStore()
