'use client'

import { Actions } from '@/components/actions'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRenameModal } from '@/store/use-rename-model'
import { useQuery } from 'convex/react'
import { MenuIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

interface InfoProps {
  boardId: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const TabSeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>
}

export const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> })
  const { onOpen } = useRenameModal()

  if (!data) return <InfoSkeleton />

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='보드로 돌아가기' side='bottom' sideOffset={10}>
        <Button className='px-2' variant='board' asChild>
          <Link href='/'>
            <Image src='/logo.svg' alt='Board logo' width={40} height={40} />
            <span className='font-semibold text-xl ml-2 text-black font-one-mobile-pop'>
              Genie
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label='보드 이름 변경' side='bottom' sideOffset={10}>
        <Button
          variant='board'
          className='text-base font-normal px-2'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <div className='w-[38px]'>
        <Actions id={data._id} title={data.title} side='bottom' sideOffset={10}>
          <div>
            <Hint label='메인메뉴' side='bottom' sideOffset={10}>
              <Button size='icon' variant='board'>
                <MenuIcon />
              </Button>
            </Hint>
          </div>
        </Actions>
      </div>
    </div>
  )
}

export function InfoSkeleton() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]' />
  )
}
