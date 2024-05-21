import {merge} from '../../utils'
import {observer} from 'mobx-react-lite'

type Screen = {
  id: string
  width: number
  height: number
}
type Props = {
  src: string
  screen: Screen
}

export const DeviceScreen = observer(({src, screen}: Props) => {
  return (
    <div
      id={`screen-${screen.id}`}
      className={merge('bg-white flex flex-col absolute border border-primary')}
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
        {src ? (
          <iframe
            src={src}
            sandbox='allow-scripts allow-forms allow-same-origin allow-presentation'
            className='w-full h-full'
            style={{height: screen.height}}
          />
        ) : (
          <div className=' flex items-center justify-center h-full w-full text-base-100'>
            Please, set an url.
          </div>
        )}
      </div>
    </div>
  )
})
