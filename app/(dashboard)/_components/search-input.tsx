'use client'

import qs from 'query-string'
import { Search, X } from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'

export const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const debounced = useDebounceCallback(setValue, 500)

  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setValue(e.target.value)
    debounced(e.target.value)
  }

  const handleClear = () => {
    if (ref.current) {
      ref.current.value = ''
    }
    setValue('')

    router.push('/')
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [value, router])

  return (
    <div className='w-full relative max-w-[516px]'>
      <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4' />
      <Input
        ref={ref}
        className='w-full pl-9 pr-9'
        placeholder='찾기...'
        onChange={handleChange}
      />
      {value && (
        <button
          onClick={handleClear}
          className='absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground'
        >
          <X className='size-4' />
        </button>
      )}
    </div>
  )
}
