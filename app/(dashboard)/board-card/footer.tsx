import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface FooterProps {
  isFavorite: boolean
  title: string
  authorLabel: string
  createdAtLabel: string
  onClick: () => void
  disabled: boolean
}

export const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className='relative bg-white p-3'>
      <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
      <p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground'>
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={cn(
          'opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3 text-muted-foreground hover:text-blue-600',
          disabled && 'cursor-not-allowed opacity-75'
        )}
      >
        <Star
          className={cn('size-4', isFavorite && 'text-blue-600 fill-blue-600')}
        />
      </button>
    </div>
  )
}
