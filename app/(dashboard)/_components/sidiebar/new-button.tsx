'use client'

import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Hint } from '@/components/hint'

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='aspect-square'>
          <Hint
            label='Create a new organization'
            side='right'
            sideOffset={18}
            align='start'
          >
            <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <Plus className='text-white' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full max-w-[470px] bg-transparent border-none p-0 flex items-center justify-center'>
        <CreateOrganization routing='hash' />
      </DialogContent>
    </Dialog>
  )
}
