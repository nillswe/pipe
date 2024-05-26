import {Device} from '@/domain/models'
import {appStore} from '@/store/app-store'
import {getIframeBody, getIframeHref, getIframeId} from '@/utils'
import {makeAutoObservable} from 'mobx'

export class SyncLocationStore {
  oldHref: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  private iframeListenUrlChange(
    iframe: HTMLIFrameElement,
    callback: (url: string) => void,
  ) {
    iframe.contentWindow?.addEventListener('load', () => {
      this.oldHref = getIframeHref(iframe)
      const body = getIframeBody(iframe)

      const observer = new MutationObserver(() => {
        const newHref = getIframeHref(iframe)

        console.log({oldHref: this.oldHref, newHref})

        if (this.oldHref !== newHref) {
          this.oldHref = newHref
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

      this.iframeListenUrlChange(iframe, url => {
        console.log('changed', url)
        devices.forEach(({id}) => {
          if (id !== device.id) {
            appStore.setUrl(url, id)
          }
        })
      })
    })
  }
}

export const syncLocationStore = new SyncLocationStore()
