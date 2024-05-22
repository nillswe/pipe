import {appStore} from '@/store/app-store'
import {appUiStore} from '@/store/app-ui-store'
import {useEffect} from 'react'

export const useAppListeners = () => {
  const {devices} = appStore
  const {scale} = appUiStore

  useEffect(() => {
    window.addEventListener('wheel', event => appUiStore.scrollPage(event))
    window.addEventListener('resize', () => appUiStore.updateSize())

    return () => {
      window.removeEventListener('resize', () => appUiStore.updateSize())
      window.removeEventListener('wheel', event => appUiStore.scrollPage(event))
    }
  }, [])

  useEffect(() => {
    appUiStore.placeScreens()
  }, [scale, devices])

  return {}
}
