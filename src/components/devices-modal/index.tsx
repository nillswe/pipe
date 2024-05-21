import {devices} from '@/constants/devices'
import {merge} from '@/utils'
import {LaptopMinimal, Monitor, Smartphone, Tablet, X} from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const DevicesModal = ({isOpen, onClose}: Props) => {
  const onSubmit = () => {}

  return (
    <dialog className={merge(['modal', isOpen && 'modal-open'])}>
      <div className='modal-box w-6/12 max-w-5xl bg-base flex flex-col overflow-visible'>
        <div
          className='btn btn-circle btn-sm absolute -right-3 -top-3 border border-base-content shadow-md'
          onClick={onClose}>
          <X size={22} />
        </div>

        <div className='w-full grid grid-cols-5 gap-5'>
          {devices.map(device => {
            return (
              <div className='flex flex-col w-full text-center items-center bg-base-300 p-2 rounded-md'>
                <span>
                  {device.type === 'Smartphone' && <Smartphone size={22} />}
                  {device.type === 'Laptop' && <LaptopMinimal size={22} />}
                  {device.type === 'Computer' && <Monitor size={22} />}
                  {device.type === 'Tablet' && <Tablet size={22} />}
                </span>
                <span className='text-sm'>{device.name}</span>
              </div>
            )
          })}
        </div>

        <div className='modal-action  w-full flex'>
          <button className='btn btn-neutral ' onClick={onSubmit}>
            Close
          </button>
          <button className='btn btn-primary w-28 ' onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  )
}
