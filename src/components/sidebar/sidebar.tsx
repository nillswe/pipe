import {useToggle} from '@uidotdev/usehooks'
import {Link2, Maximize2, MonitorSmartphone, Rows3} from 'lucide-react'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {SidebarToggle} from '@/components/sidebar/sidebar-toggle'
import {merge} from '@/utils'

export const Sidebar = () => {
  const [on, toggle] = useToggle(false)

  return (
    <div className='absolute left-5 bottom-5 z-50'>
      <div
        className={merge([
          'bg-neutral w-12 rounded-md h-12 border shadow-ms border-neutral-content',
          'flex flex-col items-center py-4',
          'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
          on && 'h-[calc(100vh-40px)] w-16',
        ])}>
        <div className={merge(['flex flex-col items-center gap-2 h-ful'])}>
          <h1
            className={merge([
              'opacity-0 w-full flex justify-center border border-primary/20 py-2 rounded-md text-primary',
              on && 'animate-fadeUp [animation-delay:50ms]',
            ])}>
            <span className='text-3xl font-extrabold'>P/</span>
          </h1>

          <SidebarButton isOpen={on} delay={100}>
            <Link2 size={20} />
          </SidebarButton>

          <SidebarButton isOpen={on} delay={200}>
            <MonitorSmartphone size={20} />
          </SidebarButton>

          <SidebarButton isOpen={on} delay={300}>
            <Maximize2 size={20} />
          </SidebarButton>

          <SidebarButton isOpen={on} delay={400}>
            <Rows3 size={20} />
          </SidebarButton>
        </div>
      </div>

      <SidebarToggle isOpen={on} toggle={toggle} />
    </div>
  )
}
