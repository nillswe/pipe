import {Device} from '@/domain/models'
import {getIframeBody, getIframeHref, getIframeId} from '@/utils'
import {makeAutoObservable} from 'mobx'

export class SyncLocationStore {
  lastDispatched: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  private iframeListenUrlChange(
    iframe: HTMLIFrameElement,
    callback: (url: string) => void,
  ) {
    iframe.contentWindow?.addEventListener('load', () => {
      let oldHref = getIframeHref(iframe)
      const body = getIframeBody(iframe)

      const observer = new MutationObserver(() => {
        const newHref = getIframeHref(iframe)

        if (oldHref !== newHref) {
          oldHref = newHref
          callback(newHref)
        }
      })

      if (!body) return
      observer.observe(body, {childList: true, subtree: true})
    })
  }

  initialize(devices: Device[]) {
    devices.forEach(device => {
      const selector = `#${getIframeId(device.id)}`
      const iframe = document.querySelector<HTMLIFrameElement>(selector)

      if (!iframe) return

      this.iframeListenUrlChange(iframe, url => console.log(url))
    })
  }
}

export const syncLocationStore = new SyncLocationStore()
