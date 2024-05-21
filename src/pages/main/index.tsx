import {DeviceScreen} from '@/components'
import {ViewportContainer, ZoomContainer} from '@/components/containers'
import {Sidebar} from '@/components/sidebar'
import {useScreenListeners} from '@/hooks/use-screen-listeners'
import {appStore} from '@/store/app-store'
import {Info} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect} from 'react'

export const MainPage = observer(() => {
  const {
    setPageInitialDimensions,
    updateSize,
    placeScreens,
    scrollPage,
    onZoom,
    posX,
    posY,
    zoom,
  } = useScreenListeners()

  const {devices} = appStore

  useEffect(() => {
    const {width, height} = document.body.getBoundingClientRect()
    setPageInitialDimensions({width, height})
  }, [setPageInitialDimensions])

  useEffect(() => {
    placeScreens()

    document.addEventListener('wheel', scrollPage)
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
      document.removeEventListener('wheel', scrollPage)
    }
  }, [placeScreens, scrollPage, updateSize])

  return (
    <main
      id='page-root'
      className='w-screen relative bg-base h-screen flex overflow-hidden'
      onWheel={event => onZoom(event)}>
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
          <ViewportContainer posX={posX} posY={posY}>
            <ZoomContainer zoom={zoom}>
              {devices.map(device => (
                <DeviceScreen
                  key={device.id + appStore.url}
                  src={appStore.url}
                  screen={device}
                />
              ))}
            </ZoomContainer>
          </ViewportContainer>
        )}
      </div>
    </main>
  )
})
