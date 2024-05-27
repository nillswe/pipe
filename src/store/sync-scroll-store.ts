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
    let isBeingControlled = false

    const onMessage = (event: MessageEvent) => {
      if (event.data?.message === 'FRAME_SCROLL') {
        if (event.data?.deviceIdOrigin !== device.id) {
          getIframeDocElement(iframe)?.scrollTo({
            top: event.data.top,
            left: event.data.left,
          })
          isBeingControlled = true
          return
        }
        isBeingControlled = false
      }
    }

    window.addEventListener('message', onMessage)

    getIframeContentDoc(iframe)?.addEventListener('scroll', () => {
      if (!this.isSyncScrollOn) return
      if (isBeingControlled) return

      window.postMessage({
        message: 'FRAME_SCROLL',
        deviceIdOrigin: device.id,
        top: getIframeDocElement(iframe)?.scrollTop ?? 0,
        left: getIframeDocElement(iframe)?.scrollLeft ?? 0,
      })
    })
  }
}

export const syncScrollStore = new SyncScrollStore()
