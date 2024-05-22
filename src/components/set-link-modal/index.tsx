import {merge} from '@/utils'
import {appStore} from '@/store/app-store'
import {useState} from 'react'
import {X} from 'lucide-react'
import {observer} from 'mobx-react-lite'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SetLinkModal = observer(({isOpen, onClose}: Props) => {
  const [url, setUrl] = useState('')

  const onSubmit = () => {
    appStore.setUrl(url)
    onClose()
  }

  return (
    <>
      <dialog className={merge(['modal', isOpen && 'modal-open'])}>
        <div className='modal-box w-6/12 max-w-5xl bg-base flex overflow-visible'>
          <div
            className='btn btn-circle btn-sm absolute -right-3 -top-3 border border-base-content shadow-md'
            onClick={onClose}>
            <X size={22} />
          </div>
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            className='input input-primary w-full rounded-r-none'
            placeholder='Type an url'
          />
          <button
            type='button'
            className='btn btn-primary w-28 rounded-l-none'
            onClick={onSubmit}>
            Save
          </button>
        </div>
      </dialog>
    </>
  )
})
