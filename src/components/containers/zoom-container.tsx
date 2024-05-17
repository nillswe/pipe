import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  zoom: number
}

export const ZoomContainer = ({children, zoom}: Props) => {
  return (
    <div
      id='zoom-screen'
      style={{
        transform: ` scale(${zoom})`,
        transformStyle: 'preserve-3d',
      }}>
      {children}
    </div>
  )
}
