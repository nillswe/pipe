import {useToggle} from '@uidotdev/usehooks'
import {Link2, Maximize2, Menu, MonitorSmartphone, Rows3, X} from 'lucide-react'
import {merge} from '../../utils'

export const SidebarToggle = () => {
  const [on, toggle] = useToggle(false)

  return (
    <div className='absolute left-5 bottom-5 z-50'>
      <div
        className={merge([
          'bg-white w-12 rounded-md h-12 border shadow-ms border-neutral/30',
          'flex flex-col items-center py-4',
          'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
          on && 'h-[calc(100vh-40px)] w-16',
        ])}>
        <div className={merge(['flex flex-col items-center gap-2 h-ful'])}>
          <h1
            className={merge([
              'opacity-0 w-full flex justify-center border border-gray-300 py-2 rounded-md',
              on && 'animate-fadeUp [animation-delay:50ms]',
            ])}>
            <span className='text-3xl font-extrabold'>P/</span>
          </h1>
          <button
            className={merge([
              'btn btn-md btn-square btn-ghost opacity-0',
              on && 'animate-fadeUp [animation-delay:100ms]',
            ])}>
            <Link2 size={20} color='black' />
          </button>
          <button
            className={merge([
              'btn btn-md btn-square btn-ghost opacity-0',
              on && 'animate-fadeUp [animation-delay:250ms]',
            ])}>
            <MonitorSmartphone size={20} color='black' />
          </button>
          <button
            className={merge([
              'btn btn-md btn-square btn-ghost opacity-0',
              on && 'animate-fadeUp [animation-delay:400ms]',
            ])}>
            <Maximize2 size={20} color='black' />
          </button>
          <button
            className={merge([
              'btn btn-md btn-square btn-ghost opacity-0',
              on && 'animate-fadeUp [animation-delay:550ms]',
            ])}>
            <Rows3 size={20} color='black' />
          </button>
        </div>
      </div>

      <div
        className={merge([
          'absolute bottom-0 left-0 btn btn-square',
          'transition-all duration-1000',
          !on && 'btn-ghost',
          on && 'left-2 bottom-2 btn-neutral',
        ])}
        onClick={() => toggle()}>
        {on ? (
          <X size={22} className={merge([on && 'animate-fadeUp'])} />
        ) : (
          <Menu size={22} className={merge([!on && 'animate-fadeDown'])} />
        )}
      </div>
    </div>
  )
}
