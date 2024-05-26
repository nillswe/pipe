import {appStore} from '@/store/app-store'
import {appUIStore} from '@/store/app-ui-store'
import {useEffect} from 'react'

export const useAppListeners = () => {
  useEffect(() => {
    window.addEventListener('resize', () => appUIStore.updateSize())
    window.addEventListener('wheel', event => appUIStore.scrollPage(event))

    return () => {
      window.removeEventListener('resize', () => appUIStore.updateSize())
      window.removeEventListener('wheel', event => appUIStore.scrollPage(event))
    }
  }, [])

  useEffect(() => {
    appStore.initialize()
  }, [])

  return {}
}
