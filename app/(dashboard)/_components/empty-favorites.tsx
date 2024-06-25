import Image from 'next/image'

export const EmptyFavorites = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image
        src='/empty-favorites.svg'
        alt='empty-favorites'
        width={200}
        height={200}
      />
      <h2 className='text-2xl font-semibold mt-6'>즐겨찾기가 없습니다.</h2>
      <p className='text-sm text-muted-foreground mt-2'>
        즐겨찾기를 추가해보세요.
      </p>
    </div>
  )
}
