'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Filter } from 'lucide-react'
import * as filters from '../constants/filters'
import { cn } from '@/lib/utils'
import { Options } from 'nuqs'

type ToursSortButtonProps = {
  sortingState: {
    sorting: string
    setSorting: (
      value: string | ((old: string) => string | null) | null,
      options?: Options,
    ) => Promise<URLSearchParams>
  }
}

export default function TourSortButton({ sortingState }: ToursSortButtonProps) {
  const { sorting, setSorting } = sortingState

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
          <span>Sort</span>
          <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filters.SORT_OPTIONS.map((option) => {
            const isSelected = option.value === sorting

            return (
              <button
                key={option.name}
                disabled={isSelected}
                className={cn('text-left w-full block px-4 py-2 text-sm', {
                  'text-gray-900 bg-gray-100 cursor-not-allowed': isSelected,
                  'text-gray-500 hover:bg-gray-50 cursor-pointer': !isSelected,
                })}
                onClick={() => {
                  if (!isSelected) {
                    void setSorting(option.value)
                  }
                }}
              >
                {option.name}
              </button>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 lg:hidden">
        <Filter className="h-5 w-5" />
      </button>
    </div>
  )
}
