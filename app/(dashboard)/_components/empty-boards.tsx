'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import { toast } from 'sonner'

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.boards.create)

  const onClick = () => {
    if (!organization) {
      return
    }
    mutate({
      orgId: organization.id,
      title: '첫번째 보드',
    })
      .then((id) => {
        toast.success('보드가 생성되었습니다.')
        // Redirect board id
      })
      .catch(() => toast.error('보드 생성에 실패했습니다.'))
  }
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image src='/note.svg' alt='note' width={200} height={200} />
      <h2 className='text-2xl font-semibold mt-6'>
        첫번째 보드를 만들어보세요
      </h2>
      <p className='text-sm text-muted-foreground mt-2'>
        팀을 위한 보드를 만들고 시작해볼까요?
      </p>
      <div className='mt-6'>
        <Button disabled={pending} size='lg' onClick={onClick}>
          보드 만들기
        </Button>
      </div>
    </div>
  )
}
