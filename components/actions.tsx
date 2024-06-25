'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { ConfirmModal } from './confirm-modal'
import { Button } from './ui/button'
import { useRenameModal } from '@/store/use-rename-model'

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export function Actions({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) {
  const { onOpen } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.remove)

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('링크가 복사되었습니다.'))
      .catch(() => toast.error('링크 복사에 실패했습니다.'))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('삭제되었습니다.'))
      .catch(() => toast.error('삭제에 실패했습니다.'))
  }
  return (
    <div className='absolute z-50 top-1 right-1'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className='w-60'
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem onClick={onCopyLink} className='cursor-pointer p-3'>
            <Link2 className='size-4 mr-2' />
            링크 복사
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen(id, title)
            }}
            className='cursor-pointer p-3'
          >
            <Pencil className='size-4 mr-2' />
            보드 이름 변경
          </DropdownMenuItem>
          <ConfirmModal
            onConfirm={onDelete}
            header='보드를 삭제하시겠습니까?'
            description='보드를 삭제하면 보드에 있는 모든 내용들이 삭제됩니다.'
            disabled={pending}
          >
            <Button
              className='cursor-pointer p-3  text-red-500 text-sm w-full justify-normal font-normal'
              variant='ghost'
            >
              <Trash2 className='size-4 mr-2' />
              삭제
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
