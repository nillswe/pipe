import {merge} from '@/utils'
import {X, Menu} from 'lucide-react'

type Props = {
  isOpen: boolean
  toggle: () => void
}

export const SidebarToggle = ({isOpen, toggle}: Props) => {
  return (
    <div
      className={merge([
        'absolute bottom-0 left-0 btn btn-square',
        'transition-all duration-1000',
        !isOpen && 'btn-ghost',
        isOpen && 'left-2 bottom-2 btn-primary',
      ])}
      onClick={() => toggle()}>
      {isOpen ? (
        <X
          size={22}
          className={merge(['text-base-content', isOpen && 'animate-fadeUp'])}
        />
      ) : (
        <Menu
          size={22}
          className={merge(['text-base-100', !isOpen && 'animate-fadeDown '])}
        />
      )}
    </div>
  )
}
