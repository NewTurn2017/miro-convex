import Image from 'next/image'

export const EmptySearch = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image
        src='/empty-search.svg'
        alt='empty-search'
        width={200}
        height={200}
      />
      <h2 className='text-2xl font-semibold mt-6'>검색 결과가 없습니다.</h2>
      <p className='text-sm text-muted-foreground mt-2'>
        다른 검색어를 입력해보세요.
      </p>
    </div>
  )
}
