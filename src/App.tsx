import {useEffect} from 'react'
import {DeviceScreen} from './components'
import {ViewportContainer, ZoomContainer} from './components/containers'
import {useScreenListeners} from './hooks/use-screen-listeners'
import {Sidebar} from './components/sidebar'

const screens = [
  {
    id: 'mobile-generic',
    width: 414,
    height: 896,
  },
  {
    id: 'desktop-generic',
    width: 1440,
    height: 900,
  },

  {
    id: 'tablet-generic',
    width: 960,
    height: 900,
  },
]

function App() {
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
      className='w-screen relative bg-base h-screen flex overflow-hidden'
      onWheel={event => onZoom(event)}>
      <Sidebar />

      <div className='flex min-w-full h-screen overflow-hidden relative '>
        <ViewportContainer posX={posX} posY={posY}>
          <ZoomContainer zoom={zoom}>
            {screens.map(screen => (
              <DeviceScreen
                key={screen.id}
                src='http://localhost:3000/app'
                screen={screen}
              />
            ))}
          </ZoomContainer>
        </ViewportContainer>
      </div>
    </main>
  )
}

export default App
