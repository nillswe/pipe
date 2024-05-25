import {useToggle} from '@uidotdev/usehooks'
import {Link2, Maximize, MonitorSmartphone} from 'lucide-react'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {SidebarToggle} from '@/components/sidebar/sidebar-toggle'
import {merge} from '@/utils'
import {Logo} from '@/components/brand/logo'
import {SetLinkModal} from '@/components/set-link-modal'
import {DevicesModal} from '@/components/devices-modal'
import {appUIStore} from '@/store/app-ui-store'

export const Sidebar = () => {
  const [isSidebarOpen, toggleSidebar] = useToggle(false)
  const [isLinkModalOpen, toggleLinkModal] = useToggle(false)
  const [isDevicesModalOpen, toggleDevicesModal] = useToggle(false)

  return (
    <>
      <div className='absolute left-5 bottom-5 z-50' data-testid='sidebar'>
        <div
          className={merge([
            'bg-base-200 w-12 rounded-md h-12 border-[0.5px] shadow-ms border-base-content/40',
            'flex flex-col items-center py-4',
            'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
            isSidebarOpen && 'h-[calc(100vh-40px)] w-16',
          ])}>
          <div
            className={merge([
              'flex flex-col items-center gap-2 flex-1',
              isSidebarOpen &&
                '[&>div>button>svg]:animate-fadeUp [&>h1]:animate-fadeUp [&>*:nth-child(1)]:[animation-delay:100ms] [&>*:nth-child(2)>button>svg]:[animation-delay:200ms] [&>*:nth-child(3)>button>svg]:[animation-delay:300ms] [&>*:nth-child(4)>button>svg]:[animation-delay:400ms]',
            ])}>
            <Logo />

            <div className='tooltip tooltip-right' data-tip='Set site url'>
              <SidebarButton onClick={() => toggleLinkModal()}>
                <Link2 size={20} />
              </SidebarButton>
            </div>

            <div className='tooltip tooltip-right' data-tip='Add devices'>
              <SidebarButton onClick={() => toggleDevicesModal()}>
                <MonitorSmartphone size={20} />
              </SidebarButton>
            </div>

            <div className='tooltip tooltip-right' data-tip='Fit to screen'>
              <SidebarButton onClick={() => appUIStore.fitToScreen()}>
                <Maximize size={20} />
              </SidebarButton>
            </div>
          </div>
        </div>

        <SidebarToggle isOpen={isSidebarOpen} toggle={toggleSidebar} />
      </div>
      <SetLinkModal isOpen={isLinkModalOpen} onClose={toggleLinkModal} />
      <DevicesModal isOpen={isDevicesModalOpen} onClose={toggleDevicesModal} />
    </>
  )
}
