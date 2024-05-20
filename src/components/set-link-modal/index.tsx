import {merge} from '@/utils'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SetLinkModal = ({isOpen, onClose}: Props) => {
  const onSubmit = () => {}

  return (
    <>
      <dialog
        className={merge(['modal', isOpen && 'modal-open'])}
        onClick={onClose}>
        <div className='modal-box w-6/12 max-w-5xl bg-base flex'>
          <input
            className='input input-primary w-full rounded-r-none'
            placeholder='Type an url'
          />
          <button className='btn btn-primary w-28 rounded-l-none'>Save</button>
        </div>
      </dialog>
    </>
  )
}
