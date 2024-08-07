'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Overlay } from './overlay'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale/ko'
import { useAuth } from '@clerk/clerk-react'
import { Footer } from './footer'
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from '@/components/actions'
import { MoreVertical } from 'lucide-react'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko,
  })

  const { mutate: onFavorite, pending: isFavoritePending } = useApiMutation(
    api.board.favorite
  )
  const { mutate: onUnfavorite, pending: isUnfavoritePending } = useApiMutation(
    api.board.unfavorite
  )

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() =>
        toast.error('즐겨찾기 해제에 실패했습니다.')
      )
    } else {
      onFavorite({ id, orgId }).catch(() =>
        toast.error('즐겨찾기에 실패했습니다.')
      )
    }
  }
  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
          <Actions id={id} title={title} side='right'>
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreVertical className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={isFavoritePending || isUnfavoritePending}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='group aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  )
}
