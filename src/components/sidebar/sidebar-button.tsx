import {merge} from '@/utils'
import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const SidebarButton = ({children, disabled, onClick, active}: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={merge([
        'btn btn-md btn-square focus:text-primary active:text-primary text-base-content  [&>svg]:opacity-0',
        active ? 'bg-neutral/20' : 'btn-ghost',
      ])}>
      {children}
    </button>
  )
}
