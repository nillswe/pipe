import {useToggle} from '@uidotdev/usehooks'
import {
  HandHeart,
  Info,
  Link2,
  Maximize,
  Merge,
  MonitorSmartphone,
  Mouse,
} from 'lucide-react'
import {SidebarButton} from '@/components/sidebar/sidebar-button'
import {SidebarToggle} from '@/components/sidebar/sidebar-toggle'
import {merge} from '@/utils'
import {Logo} from '@/components/brand/logo'
import {SetLinkModal} from '@/components/set-link-modal'
import {DevicesModal} from '@/components/devices-modal'
import {appUIStore} from '@/store/app-ui-store'
import {observer} from 'mobx-react-lite'
import {syncLocationStore} from '@/store/sync-location-store'
import {isWebApp} from '@/platforms'
import {syncScrollStore} from '@/store/sync-scroll-store'

export const Sidebar = observer(() => {
  const [isSidebarOpen, toggleSidebar] = useToggle(true)
  const [isLinkModalOpen, toggleLinkModal] = useToggle(false)
  const [isDevicesModalOpen, toggleDevicesModal] = useToggle(false)

  return (
    <>
      <div className='absolute left-3 bottom-5 z-50' data-testid='sidebar'>
        <div
          className={merge([
            'bg-base-200 w-12 rounded-md h-12 border-[0.5px] shadow-ms border-base-content/40',
            'flex flex-col items-center py-4',
            'transition-all duration-[700ms] ease-[cubic-bezier(.38,.58,.21,.99)]',
            isSidebarOpen && 'h-[calc(100vh-40px)] w-16',
          ])}>
          <div
            className={merge([
              'flex flex-col items-center gap-2 flex-1 pb-12',
              isSidebarOpen &&
                '[&>div_button>svg]:animate-fadeUp [&>h1]:animate-fadeUp [&>*:nth-child(1)]:[animation-delay:100ms] [&>*:nth-child(2)>button>svg]:[animation-delay:150ms] [&>*:nth-child(3)>button>svg]:[animation-delay:200ms] [&>*:nth-child(4)>button>svg]:[animation-delay:250ms] [&>*:nth-child(5)>button>svg]:[animation-delay:300ms] [&>*:nth-child(6)_button>svg]:[animation-delay:350ms]',
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

            <div className='tooltip tooltip-right' data-tip='Sync scroll'>
              <SidebarButton
                disabled={isWebApp()}
                active={syncScrollStore.isSyncScrollOn}
                onClick={() => syncScrollStore.toggleSyncScroll()}>
                <Mouse size={20} />
              </SidebarButton>
            </div>

            <div
              className={merge(['tooltip tooltip-right'])}
              data-tip='Sync navigation'>
              <SidebarButton
                disabled={isWebApp()}
                active={syncLocationStore.isSynLocationOn}
                onClick={() => syncLocationStore.toggleSyncLocation()}>
                <Merge size={20} />
              </SidebarButton>
            </div>
            <div
              className={merge(['tooltip tooltip-right mt-auto'])}
              data-tip='Support the app'>
              <a
                className='text-white'
                href='https://donate.stripe.com/7sI7un2ht3218bSaEF'
                target='_blank'
                title='support the app'>
                <SidebarButton>
                  <HandHeart size={20} />
                </SidebarButton>
              </a>
            </div>
            <div
              className={merge(['tooltip tooltip-right'])}
              data-tip='Privacy policy'>
              <a
                className='text-white'
                href='/privacy-policy'
                target='_blank'
                title='Privacy policy'>
                <SidebarButton>
                  <Info size={20} />
                </SidebarButton>
              </a>
            </div>
          </div>
        </div>

        <SidebarToggle isOpen={isSidebarOpen} toggle={toggleSidebar} />
      </div>
      <SetLinkModal isOpen={isLinkModalOpen} onClose={toggleLinkModal} />
      <DevicesModal isOpen={isDevicesModalOpen} onClose={toggleDevicesModal} />
    </>
  )
})
