import {Device} from '@/domain/models'
import {isWebApp} from '@/platforms'
import {getIframeBody, getIframeElem, getIframeHref} from '@/utils'
import {makeAutoObservable} from 'mobx'

export class SyncLocationStore {
  oldHref: string = ''
  isSynLocationOn: boolean = true

  constructor() {
    makeAutoObservable(this)
    if (isWebApp()) {
      this.isSynLocationOn = false
    }
  }

  toggleSyncLocation() {
    this.isSynLocationOn = !this.isSynLocationOn
  }

  private iframeObserver(
    iframe: HTMLIFrameElement,
    callback: (url: string) => void,
  ) {
    this.oldHref = getIframeHref(iframe)
    const body = getIframeBody(iframe)
    if (!body) return

    const observer = new MutationObserver(() => {
      const newHref = getIframeHref(iframe)

      if (this.oldHref !== newHref) {
        this.oldHref = newHref
        callback(newHref)
      }
    })

    observer.observe(body, {childList: true, subtree: true, attributes: true})
    return observer
  }

  syncLocation(device: Device) {
    const iframe = getIframeElem(device.id)!
    let gotRedirected: boolean = false

    const onMessage = (event: MessageEvent) => {
      if (event.data?.message === 'URL_CHANGED') {
        if (event.data.deviceIdOrigin !== device.id) {
          iframe.contentWindow?.location.assign(event.data.data)
          gotRedirected = true
          return
        }
        gotRedirected = false
      }
    }

    window?.addEventListener('message', onMessage)

    this.iframeObserver(iframe, url => {
      if (!this.isSynLocationOn) return

      // prevent dispatch message after be redirected from another device
      // Redirect loop
      if (!gotRedirected) {
        window.postMessage({
          message: 'URL_CHANGED',
          deviceIdOrigin: device.id,
          data: url,
        })
      }
    })
  }
}

export const syncLocationStore = new SyncLocationStore()
