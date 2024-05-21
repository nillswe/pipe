import {useCallback, useState, WheelEvent as ReactWheelEvent} from 'react'

export const useScreenListeners = () => {
  const [posY, setPosY] = useState(0)
  const [posX, setPosX] = useState(0)

  const [zoom, setZoom] = useState(1)
  const [initialDimensions, setInitialDimensions] = useState({
    width: 0,
    height: 0,
  })

  const toFixed = (num: number) => parseFloat(num.toFixed(2))

  const updateSize = useCallback(() => {
    const curPageDimensions = document.body.getBoundingClientRect()
    const percentageWidth = curPageDimensions.width / initialDimensions.width
    const percentageHeigh = curPageDimensions.height / initialDimensions.height

    setZoom(toFixed(Math.min(Math.min(percentageWidth, percentageHeigh), 1)))

    setPosX(0)
    setPosY(0)
  }, [initialDimensions.height, initialDimensions.width])

  const scrollPage = (scroll: WheelEvent) => {
    // @ts-ignore
    setPosX(prev => prev + scroll?.wheelDeltaX || 0)
    // @ts-ignore
    setPosY(prev => prev + scroll?.wheelDeltaY || 0)
  }

  const placeScreens = () => {
    const screens = document.querySelectorAll<HTMLDivElement>('[id^=screen-]')

    screens.forEach((screen, index) => {
      if (index === 0) {
        screen.style.left = '40px'
      } else {
        const prevScreen = screens[index - 1]
        const newPos =
          prevScreen.offsetLeft +
          (prevScreen.offsetWidth - prevScreen.offsetWidth * 0.2) +
          40
        screen.style.left = `${newPos}px`
      }
    })
  }
  const onZoom = (event: ReactWheelEvent<HTMLElement>) => {
    if (!event.ctrlKey) return

    const ZOOM_SENSITIVITY = 200
    const zoomAmount = -(event.deltaY / ZOOM_SENSITIVITY)
    setZoom(zoom => toFixed(Math.max(Math.min(zoom + zoomAmount, 2), 0.2)))
  }

  return {
    placeScreens,
    scrollPage,
    setPageInitialDimensions: setInitialDimensions,
    updateSize,
    onZoom,
    posX,
    posY,
    zoom,
  }
}
