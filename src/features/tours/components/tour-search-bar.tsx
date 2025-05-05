'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type TourSearchBarType = {
  localSearchQueryState: {
    localSearchQuery: string
    setLocalSearchQuery: Dispatch<SetStateAction<string>>
  }
  searchQueryState: {
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
  }
}

export default function TourSearchBar({
  localSearchQueryState,
  searchQueryState,
}: TourSearchBarType) {
  const { localSearchQuery, setLocalSearchQuery } = localSearchQueryState
  const { setSearchQuery } = searchQueryState

  return (
    <div className="flex items-center w-full space-x-2 rounded-lg border border-gray-300 px-3.5 py-2">
      <SearchIcon className="h-4 w-4" />
      <Input
        type="search"
        placeholder="Search"
        className="w-full border-0 h-8 font-semibold"
        value={localSearchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLocalSearchQuery(e.target.value)
        }}
      />
      <Button
        onClick={() => setSearchQuery(localSearchQuery)}
        className="cursor-pointer"
      >
        Search
      </Button>
    </div>
  )
}
