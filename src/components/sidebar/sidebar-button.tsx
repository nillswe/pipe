import {merge} from '@/utils'
import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
}

export const SidebarButton = ({children, onClick}: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={merge([
        'btn btn-md btn-square btn-ghost focus:text-primary active:text-primary text-base-content  [&>svg]:opacity-0',
      ])}>
      {children}
    </button>
  )
}
