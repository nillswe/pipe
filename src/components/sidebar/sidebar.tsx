import {useToggle} from '@uidotdev/usehooks'
import {Link2, Maximize2, MonitorSmartphone, Rows3} from 'lucide-react'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {SidebarToggle} from '@/components/sidebar/sidebar-toggle'
import {merge} from '@/utils'
import {Logo} from '@/components/brand/logo'
import {SetLinkModal} from '@/components/set-link-modal'

export const Sidebar = () => {
  const [on, toggle] = useToggle(false)
  const [isLinkModalOpen, toggleLinkModal] = useToggle(false)

  return (
    <>
      <div className='absolute left-5 bottom-5 z-50'>
        <div
          className={merge([
            'bg-base-100 w-12 rounded-md h-12 border shadow-ms border-base-content',
            'flex flex-col items-center py-4',
            'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
            on && 'h-[calc(100vh-40px)] w-16',
          ])}>
          <div className={merge(['flex flex-col items-center gap-2 h-ful'])}>
            <Logo startAnimation={on} />

            <SidebarButton isOpen={on} delay={100}>
              <Link2 size={20} onClick={() => toggleLinkModal()} />
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
      <SetLinkModal isOpen={isLinkModalOpen} onClose={toggleLinkModal} />
    </>
  )
}
