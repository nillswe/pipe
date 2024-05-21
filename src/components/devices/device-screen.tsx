import {Device} from '@/types'
import {merge} from '../../utils'
import {observer} from 'mobx-react-lite'
import {X} from 'lucide-react'
import {appStore} from '@/store/app-store'

type Props = {
  src: string
  device: Device
}

export const DeviceScreen = observer(({src, device: device}: Props) => {
  const onRemoveDevice = (device: Device) => {
    appStore.removeDevice(device)
  }

  return (
    <div
      id={`screen-${device.id}`}
      className={merge('bg-white flex flex-col absolute border border-primary')}
      style={{
        width: device.width,
        height: device.height,
        top: '40px',
        transform: 'scale(0.8)',
        transformOrigin: '0px 0px',
      }}>
      <div className='w-full h-10 bg-base-200 absolute -top-14 rounded-md flex items-center px-2 justify-between'>
        <span className=''>
          {device.name} - ({device.width}px x {device.height}px)
        </span>

        <span></span>

        <span
          className='p-1 cursor-pointer'
          onClick={() => onRemoveDevice(device)}>
          <X size={18} />
        </span>
      </div>

      <div
        className='h-full w-full overflow-hidden'
        style={{
          width: device.width,
          height: device.height,
        }}>
        {src ? (
          <iframe
            src={src}
            sandbox='allow-scripts allow-forms allow-same-origin allow-presentation'
            className='w-full h-full'
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
