import {DevicesModal} from '@/components'
import {useToggle} from '@uidotdev/usehooks'
import {MonitorSmartphone} from 'lucide-react'
import {observer} from 'mobx-react-lite'

export const DevicesNotFound = observer(() => {
  const [isDevicesModalOpen, toggleDevicesModal] = useToggle(false)

  return (
    <>
      <DevicesModal isOpen={isDevicesModalOpen} onClose={toggleDevicesModal} />
      <div className='items-center justify-center flex w-screen h-full'>
        <div className='flex flex-col gap-3'>
          <span className='text-1xl'>Please, add your first device.</span>
          <button
            className='btn btn-primary'
            onClick={() => toggleDevicesModal()}>
            <MonitorSmartphone size={22} />
            Add device
          </button>
        </div>
      </div>
    </>
  )
})
