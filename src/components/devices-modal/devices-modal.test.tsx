import {DevicesModal} from '@/components/devices-modal'
import {render, screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

const makeSUT = () => {
  const sut = render(<DevicesModal isOpen={true} onClose={() => null} />)

  return {sut}
}

describe('DeviceModal', () => {
  it('should list all available devices', () => {
    makeSUT()

    const dialogContent = screen.getByTestId('modal-content')

    expect(dialogContent.children.length).not.toBe(0)
  })
})
