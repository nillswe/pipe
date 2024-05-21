import {merge} from '@/utils'

type Props = {
  startAnimation: boolean
}

export const Logo = ({startAnimation}: Props) => {
  return (
    <h1
      className={merge([
        'opacity-1 w-full flex justify-center border border-primary/20 py-2 rounded-md text-primary [animation-delay:50ms]',
        startAnimation && 'animate-fadeUp ',
      ])}>
      <span className='text-3xl font-extrabold'>P/</span>
    </h1>
  )
}
