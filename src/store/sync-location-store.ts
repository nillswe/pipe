import {Device} from '@/domain/models'
import {getIframeBody, getIframeElem, getIframeHref} from '@/utils'
import {makeAutoObservable} from 'mobx'

export class SyncLocationStore {
  oldHref: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  private iframeObserver(
    iframe: HTMLIFrameElement,
    callback: (url: string) => void,
  ) {
    console.log('iframeObserver')

    this.oldHref = getIframeHref(iframe)
    const body = getIframeBody(iframe)
    if (!body) return

    console.log('body', body)

    const observer = new MutationObserver(() => {
      const newHref = getIframeHref(iframe)

      console.log({oldHref: this.oldHref, newHref})

      if (this.oldHref !== newHref) {
        this.oldHref = newHref
        callback(newHref)
      }
    })

    observer.observe(body, {childList: true, subtree: true})
  }

  private iframeListenUrlChange(
    iframe: HTMLIFrameElement,
    callback: (url: string) => void,
  ) {
    console.log('iframeListenUrlChange called')

    iframe.contentWindow?.removeEventListener('load', () =>
      this.iframeObserver(iframe, callback),
    )
    iframe.contentWindow?.addEventListener('load', () =>
      this.iframeObserver(iframe, callback),
    )
  }

  initialize(devices: Device[]) {
    devices.forEach(device => {
      const iframe = getIframeElem(device.id)
      if (!iframe) return

      console.log({iframe})

      this.iframeListenUrlChange(iframe, url => {
        devices.forEach(dev => {
          if (dev.id !== device.id) {
            getIframeElem(dev.id)?.contentWindow?.location.assign(url)
            this.initialize(devices)
          }
        })
      })
    })
  }
}

export const syncLocationStore = new SyncLocationStore()
