import {merge} from '../../utils'

type Screen = {
  id: string
  width: number
  height: number
}
type Props = {
  src: string
  screen: Screen
}

export const DeviceScreen = ({src, screen}: Props) => {
  return (
    <div
      id={`screen-${screen.id}`}
      className={merge('bg-white flex flex-col absolute')}
      style={{
        width: screen.width,
        height: screen.height,
        top: '40px',
        transform: 'scale(0.8)',
        transformOrigin: '0px 0px',
      }}>
      <div
        className='h-full w-full overflow-hidden'
        style={{
          width: screen.width,
          height: screen.height,
        }}>
        <iframe
          src={src}
          sandbox='allow-scripts allow-forms allow-same-origin allow-presentation'
          className='w-full h-full'
          style={{height: screen.height}}></iframe>
      </div>
    </div>
  )
}
