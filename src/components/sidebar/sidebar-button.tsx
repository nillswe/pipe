import {merge} from '@/utils'
import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  isOpen: boolean
  delay: number
}

export const SidebarButton = ({children, isOpen, delay}: Props) => {
  return (
    <button
      type='button'
      className={merge([
        'btn btn-md btn-square btn-ghost focus:text-primary active:text-primary opacity-1 text-base-content focus:animate-none active:animate-none ',
        isOpen && 'animate-fadeUp',
      ])}
      style={{
        animationDelay: `${delay}ms`,
      }}>
      {children}
    </button>
  )
}
