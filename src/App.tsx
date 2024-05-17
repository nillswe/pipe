import {useEffect, useState} from 'react'
import {DeviceScreen} from './components'

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
  const [posY, setPosY] = useState(0)
  const [posX, setPosX] = useState(0)

  useEffect(() => {
    const screens = document.querySelectorAll('[id^=screen-]')

    console.log({screens})

    screens.forEach((screen, index) => {
      if (index === 0) {
        screen.style.left = '40px'
      } else {
        const prevScreen = screens[index - 1]
        const newPos = prevScreen.offsetLeft + prevScreen.offsetWidth + 40
        screen.style.left = `${newPos}px`
      }
    })
  }, [])

  useEffect(() => {
    document.addEventListener('wheel', scroll => {
      setPosX(prev => prev + scroll.wheelDeltaX)
      setPosY(prev => prev + scroll.wheelDeltaY)
    })
  }, [])

  return (
    <main className='w-full bg-neutral h-full flex overflow-hidden'>
      {/* CANVAS */}
      <div className='flex min-w-full h-screen overflow-hidden relative'>
        {/* VIEWPORT */}
        <div
          style={{
            transform: `translate3d(${posX}px, ${posY}px, 0px)`,
          }}>
          {screens.map((screen, index) => (
            <DeviceScreen
              key={screen.id}
              src='http://localhost:3000/app'
              screen={screen}
              prevScreen={screens[index - 1]}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
