import {DeviceScreen} from '@/components'
import {ViewportContainer, ZoomContainer} from '@/components/containers'
import {Sidebar} from '@/components/sidebar'
import {appStore} from '@/store/app-store'
import {appUiStore} from '@/store/app-ui-store'
import {Info} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect} from 'react'

export const MainPage = observer(() => {
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

  return (
    <main
      id='page-root'
      className='w-screen relative bg-base h-screen flex overflow-hidden'
      onWheel={event => appUiStore.onZoom(event)}>
      <Sidebar />

      <div
        id='content-container'
        className='flex w-full h-screen overflow-hidden relative'>
        {devices.length === 0 && (
          <div className='items-center justify-center flex w-screen h-full'>
            <div className='alert alert-info w-9/12'>
              <Info size={22} />
              <span>Please, add your first device.</span>
            </div>
          </div>
        )}

        {devices.length > 0 && (
          <ViewportContainer
            posX={appUiStore.viewportPos.x}
            posY={appUiStore.viewportPos.y}>
            <ZoomContainer zoom={appUiStore.zoom}>
              {devices.map(device => (
                <DeviceScreen
                  key={device.id + appStore.url}
                  src={appStore.url}
                  device={device}
                />
              ))}
            </ZoomContainer>
          </ViewportContainer>
        )}
      </div>
    </main>
  )
})
