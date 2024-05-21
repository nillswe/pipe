import {useToggle} from '@uidotdev/usehooks'
import {Link2, Maximize2, MonitorSmartphone} from 'lucide-react'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {SidebarToggle} from '@/components/sidebar/sidebar-toggle'
import {merge} from '@/utils'
import {Logo} from '@/components/brand/logo'
import {SetLinkModal} from '@/components/set-link-modal'
import {DevicesModal} from '@/components/devices-modal'

export const Sidebar = () => {
  const [on, toggle] = useToggle(false)
  const [isLinkModalOpen, toggleLinkModal] = useToggle(false)
  const [isDevicesModalOpen, toggleDevicesModal] = useToggle(false)

  return (
    <>
      <div className='absolute left-5 bottom-5 z-50'>
        <div
          className={merge([
            'bg-base-100 w-12 rounded-md h-12 border shadow-ms border-base-content',
            'flex flex-col items-center py-4 overflow-hidden',
            'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
            on && 'h-[calc(100vh-40px)] w-16',
          ])}>
          <div
            className={merge([
              'flex flex-col items-center gap-2 flex-1',
              on &&
                '[&>button>svg]:animate-fadeUp [&>h1]:animate-fadeUp [&>*:nth-child(1)>h1]:[animation-delay:100ms] [&>*:nth-child(2)>svg]:[animation-delay:200ms] [&>*:nth-child(3)>svg]:[animation-delay:300ms] [&>*:nth-child(4)>svg]:[animation-delay:400ms]',
            ])}>
            <Logo />

            <SidebarButton onClick={() => toggleLinkModal()}>
              <Link2 size={20} />
            </SidebarButton>

            <SidebarButton onClick={() => toggleDevicesModal()}>
              <MonitorSmartphone size={20} />
            </SidebarButton>

            <SidebarButton>
              <Maximize2 size={20} />
            </SidebarButton>
          </div>
        </div>

        <SidebarToggle isOpen={on} toggle={toggle} />
      </div>
      <SetLinkModal isOpen={isLinkModalOpen} onClose={toggleLinkModal} />
      <DevicesModal isOpen={isDevicesModalOpen} onClose={toggleLinkModal} />
    </>
  )
}
