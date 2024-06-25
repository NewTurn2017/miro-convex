'use client'

import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      orgId: orgId,
      title: '제목 없음',
    })
      .then((id) => {
        toast.success('보드가 생성되었습니다.')
        // Redirect board id
      })
      .catch(() => toast.error('보드 생성에 실패했습니다.'))
  }
  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 items-center justify-center py-6 flex flex-col relative',
        (disabled || pending) &&
          'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <Plus className='size-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>보드 만들기</p>
    </button>
  )
}
