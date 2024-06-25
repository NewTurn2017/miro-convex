import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'

export const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/elements.svg' alt='Empty' height={200} width={200} />
      <h2 className='text-2xl font-semibold mt-6'>Genie Board</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        시작하기위해 팀을 만드세요
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='lg'>팀 만들기</Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent max-w-[432px] border-none'>
            <CreateOrganization routing='hash' />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
