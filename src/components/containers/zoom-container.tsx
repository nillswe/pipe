import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  zoom: number
}

export const ZoomContainer = ({children, zoom}: Props) => {
  return (
    <div
      id='zoom-container'
      data-testid='zoom-container'
      style={{
        transform: ` scale(${zoom})`,
        transformStyle: 'preserve-3d',
      }}>
      {children}
    </div>
  )
}
