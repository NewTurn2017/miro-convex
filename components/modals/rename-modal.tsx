'use client'

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogContent,
} from '@/components/ui/dialog'
import { useRenameModal } from '@/store/use-rename-model'
import { FormEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update)
  const { isOpen, initialValues, onClose } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('보드 이름이 변경되었습니다.')
        onClose()
      })
      .catch(() => {
        toast.error('보드 이름 변경에 실패했습니다.')
      })
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>보드 이름변경</DialogTitle>
        </DialogHeader>
        <DialogDescription>보드의 이름을 변경합니다.</DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='보드 이름을 입력해주세요.'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                취소
              </Button>
            </DialogClose>
            <Button disabled={pending} type='submit'>
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
