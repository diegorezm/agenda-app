import foto1 from '@/assets/dog high five-bro.svg'
import Image from 'next/image'
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div>
        <Image src={foto1} alt={"image"} />
      </div>
      <div className='text-xl'>
      <p>Organize your contacts!</p>
      <p>Don't have an account yet? <a href="/signup" className='text-blue-600 hover:text-blue-400'>join us!</a></p>
      </div>

    </div>
  )
}
