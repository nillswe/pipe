import {autorun, makeAutoObservable} from 'mobx'
import {WheelEvent as ReactWheelEvent, RefObject} from 'react'

type ViewportPosition = {
  x: number
  y: number
}

type WindowDimensions = {
  width: number
  height: number
}

export class AppUIStore {
  screenPaddingY: number = 40
  viewportPos: ViewportPosition = {x: 0, y: 0}
  zoom: number = 0.9
  screenDimensions: WindowDimensions = {width: 0, height: 0}
  screensContainerRef: RefObject<HTMLDivElement> | null = null

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      const {availWidth, availHeight} = window.screen
      this.setScreenDimensions({width: availWidth, height: availHeight})
    })
  }

  initialize(screensContainerRef: RefObject<HTMLDivElement>) {
    this.screensContainerRef = screensContainerRef
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
    const realDeviceHeight = device.clientHeight
    const verticalPaddings = this.screenPaddingY * 2
    return realDeviceHeight + verticalPaddings
  }

  fitToScreen() {
    const screenHeight = window.innerHeight

    const zoomContainer = document.querySelector('#zoom-container')
    const devices = zoomContainer?.children

    if (!devices) return

    // init variable with the first device
    let highestDevice = this.calcDeviceHeightWithSpaces(devices[0])

    // find the highest device
    for (const device of devices) {
      const deviceRealHeight = this.calcDeviceHeightWithSpaces(device)
      if (deviceRealHeight > highestDevice) highestDevice = deviceRealHeight
    }

    const newScale = screenHeight / highestDevice

    this.setZoom(Number(newScale.toFixed(2)))
    this.setViewportPos({x: 0, y: 0})
  }

  updateSize() {
    const curPageDimensions = document.body.getBoundingClientRect()

    const percentageWidth =
      curPageDimensions.width / this.screenDimensions.width
    const percentageHeigh =
      curPageDimensions.height / this.screenDimensions.height

    this.setZoom(Math.min(Math.min(percentageWidth, percentageHeigh), 1))

    this.setViewportPos({x: 0, y: 0})
  }

  scrollPage(scroll: WheelEvent) {
    //horizontal scroll for mouse users
    if (scroll.shiftKey) {
      this.setViewportPos({
        x: this.viewportPos.x + scroll.deltaY * -1,
        y: this.viewportPos.y,
      })
      return
    }

    this.setViewportPos({
      x: this.viewportPos.x + scroll.deltaX * -1,
      y: this.viewportPos.y + scroll.deltaY * -1,
    })
  }

  onZoom = (event: ReactWheelEvent<HTMLElement>) => {
    if (!event.ctrlKey) return

    const ZOOM_SENSITIVITY = 400
    const zoomAmount = -(event.deltaY / ZOOM_SENSITIVITY)
    this.setZoom(Math.max(Math.min(this.zoom + zoomAmount, 2), 0.2))
  }

  syncLocation() {
    const id = '#screen-23da0cd9-3051-45ec-a54d-360bbc01b749 iframe'
    const iframe = document.querySelector<HTMLIFrameElement>(id)

    iframe?.contentWindow?.addEventListener('load', () => {
      console.log(iframe?.contentWindow?.location.href)
    })

    if (!iframe) return
  }
}

export const appUIStore = new AppUIStore()
