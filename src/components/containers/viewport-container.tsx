import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  posX: number
  posY: number
}

export const ViewportContainer = ({children, posY, posX}: Props) => {
  return (
    <div
      id='viewport-container'
      style={{
        transform: `translate3d(${posX}px, ${posY}px, 0px)`,
      }}>
      {children}
    </div>
  )
}
