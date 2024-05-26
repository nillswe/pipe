import {observer} from 'mobx-react-lite'
import {forwardRef, ReactNode} from 'react'

type Props = {
  children: ReactNode
  zoom: number
}

export const ZoomContainer = observer(
  forwardRef<HTMLDivElement, Props>(({children, zoom}, ref) => {
    return (
      <div
        ref={ref}
        className='flex flex-nowrap justify-start gap-5 p-5'
        id='zoom-container'
        data-testid='zoom-container'
        style={{
          transform: ` scale(${zoom})`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'top left',
        }}>
        {children}
      </div>
    )
  }),
)
