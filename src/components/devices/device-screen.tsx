import {Device} from '@/domain/models'
import {observer} from 'mobx-react-lite'
import {X} from 'lucide-react'
import {appStore} from '@/store/app-store'
import {merge} from '@/utils'
import {useToggle} from '@uidotdev/usehooks'

type Props = {
  src: string
  device: Device
}

export const DeviceScreen = observer(({src, device: device}: Props) => {
  const [isFrameActive, toggleFrame] = useToggle(false)

  const onRemoveDevice = (device: Device) => {
    appStore.removeDevice(device)
  }

  return (
    <div
      id={`screen-${device.id}`}
      className={merge('bg-white flex flex-col relative mt-10')}
      style={{
        width: device.width,
        height: device.height,
      }}>
      <div className='w-full h-8 bg-base-200 absolute -top-10 flex items-center px-2 justify-between'>
        <span className='text-xs'>
          {device.name} | {device.width}px x {device.height}px
        </span>

        <span></span>

        <span
          className='p-1 cursor-pointer'
          onClick={() => onRemoveDevice(device)}>
          <X size={18} />
        </span>
      </div>

      <div
        onClick={() => toggleFrame(true)}
        onMouseLeave={() => toggleFrame(false)}
        className={merge([
          'h-full w-full overflow-hidden cursor-pointer',
          isFrameActive && 'cursor-auto',
        ])}
        style={{
          width: device.width,
          height: device.height,
        }}>
        {src ? (
          <iframe
            src={src}
            sandbox='allow-scripts allow-forms allow-same-origin allow-presentation'
            allow='web-share'
            className={merge([
              'w-full h-full border border-primary pointer-events-none',
              isFrameActive && 'pointer-events-auto',
            ])}
            style={{height: device.height}}
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
