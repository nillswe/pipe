import {DeviceScreen} from '@/components'
import {ViewportContainer, ZoomContainer} from '@/components/containers'
import {Sidebar} from '@/components/sidebar'
import {useAppListeners} from '@/hooks/use-app-listeners'
import {DevicesNotFound} from '@/pages/main/components'
import {appStore} from '@/store/app-store'
import {appUIStore} from '@/store/app-ui-store'
import {observer} from 'mobx-react-lite'

export const MainPage = observer(() => {
  useAppListeners()

  const {devices} = appStore

  return (
    <main
      id='page-root'
      className='w-screen relative bg-base h-screen flex overflow-hidden'
      onWheel={event => appUIStore.onZoom(event)}>
      <Sidebar />

      <section
        id='content-container'
        className='flex w-full h-screen overflow-hidden relative'>
        {devices.length === 0 && <DevicesNotFound />}

        {devices.length > 0 && (
          <ViewportContainer
            posX={appUIStore.viewportPos.x}
            posY={appUIStore.viewportPos.y}>
            <ZoomContainer zoom={appUIStore.zoom}>
              {devices.map(device => (
                <DeviceScreen
                  key={device.id}
                  src={appStore.url}
                  device={device}
                />
              ))}
            </ZoomContainer>
          </ViewportContainer>
        )}
      </section>
    </main>
  )
})
