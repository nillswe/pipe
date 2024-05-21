import {merge} from '@/utils'

export const Logo = () => {
  return (
    <h1
      className={merge([
        'opacity-0 w-full flex justify-center border border-primary/20 py-2 rounded-md text-primary ',
      ])}>
      <span className='text-3xl font-extrabold'>P/</span>
    </h1>
  )
}
