import {Device} from '@/domain/models'
import {isWebApp} from '@/platforms'
import {getIframeContentDoc, getIframeDocElement, getIframeElem} from '@/utils'
import {makeAutoObservable} from 'mobx'

class SyncScrollStore {
  isSyncScrollOn: boolean = true
  constructor() {
    makeAutoObservable(this)

    if (isWebApp()) {
      this.isSyncScrollOn = false
    }
  }

  toggleSyncScroll() {
    this.isSyncScrollOn = !this.isSyncScrollOn
  }

  syncScroll(device: Device) {
    const iframe = getIframeElem(device.id)!
    const iframeDocElem = getIframeDocElement(iframe)

    const onMessage = (event: MessageEvent) => {
      if (event.data?.message === 'FRAME_SCROLL') {
        if (event.data?.deviceIdOrigin !== device.id) {
          iframeDocElem?.scrollTo({
            top: event.data.top,
            left: event.data.left,
          })
          return
        }
      }
    }

    window.addEventListener('message', onMessage)

    getIframeContentDoc(iframe)?.addEventListener('wheel', () => {
      if (!this.isSyncScrollOn) return

      window.postMessage({
        message: 'FRAME_SCROLL',
        deviceIdOrigin: device.id,
        top: iframeDocElem?.scrollTop ?? 0,
        left: iframeDocElem?.scrollLeft ?? 0,
      })
    })
  }
}

export const syncScrollStore = new SyncScrollStore()
