import {DevicesModal} from '@/components/devices-modal'
import {appStore} from '@/store/app-store'
import {cleanup, render, screen} from '@testing-library/react'
import {beforeAll, describe, expect, it} from 'vitest'

import userEvent from '@testing-library/user-event'

const makeSUT = () => {
  const user = userEvent.setup()
  const sut = render(<DevicesModal isOpen={true} onClose={() => null} />)

  return {sut, user}
}

describe('DeviceModal', () => {
  beforeAll(() => {
    cleanup()
  })

  it('should list all available devices', () => {
    makeSUT()

    const dialogContent = screen.getByTestId('modal-content')

    expect(dialogContent.children.length).not.toBe(0)
  })

  it('should add a new device to screen when click on it', async () => {
    const {user} = makeSUT()
    const initialDevicesAmount = appStore.devices.length

    const dialogContent = screen.getByTestId('modal-content')
    const firstDevice = dialogContent.children[0]

    await user.click(firstDevice)

    expect(appStore.devices.length).toBe(initialDevicesAmount + 1)
  })
})
