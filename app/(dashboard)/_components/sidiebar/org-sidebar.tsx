'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, StarIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const isFavorites = searchParams.get('favorites')
  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
      <Link href='/'>
        <div className='flex items-center gap-x-2'>
          <Image src='/logo.svg' alt='Logo' height={60} width={60} />
          <span className={cn('font-semibold text-2xl', font.className)}>
            Genie
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className='space-y-1 w-full'>
        <Button
          variant={isFavorites ? 'ghost' : 'secondary'}
          size='lg'
          asChild
          className='font-normal justify-start px-2 w-full'
        >
          <Link href='/'>
            <LayoutDashboard className='size-4 mr-2' />팀 보드
          </Link>
        </Button>
        <Button
          variant={isFavorites ? 'secondary' : 'ghost'}
          size='lg'
          asChild
          className='font-normal justify-start px-2 w-full'
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <StarIcon className='size-4 mr-2' />
            즐겨찾는 보드
          </Link>
        </Button>
      </div>
    </div>
  )
}
