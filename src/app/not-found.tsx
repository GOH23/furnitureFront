import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='min-h-dvh flex flex-col justify-center items-center text-black'>
      <h2 className='text-2xl font-bold'>Ошибка 404 </h2>
      <Image src={'/d998d123da2480eb9fa1baded88830e1.gif'} width={300} height={300} alt={''}/>
      <Link href="/">Вернуться обратно</Link>
    </main>
  )
}