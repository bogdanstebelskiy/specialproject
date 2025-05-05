'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import * as filters from '../constants/filters'
import { Slider } from '@/components/ui/slider'
import { useEffect, useMemo, useState, useTransition } from 'react'
import debounce from 'lodash.debounce'
import { cn } from '@/lib/utils'

import { useQueryState } from 'nuqs'

import { filtersSearchParams } from '@/features/tours/config/searchParams'
import { TourCard, TourCardFallback } from './tour-card'
import TourSearchBar from './tour-search-bar'
import TourSortButton from './tour-sort-button'
import { Tour } from '@prisma/client'

type ToursFiltersProps = {
  tours: Tour[]
  bookingsAmount: number[]
}

export default function TourFilters({
  tours,
  bookingsAmount,
}: ToursFiltersProps) {
  const [isPending, startTransition] = useTransition()

  const [subcategory, setSubcategory] = useQueryState(
    'sc',
    filtersSearchParams.sc.withOptions({
      shallow: false,
      startTransition,
    }),
  )
  const [difficulty, setDifficulty] = useQueryState(
    'd',
    filtersSearchParams.d.withOptions({
      shallow: false,
      startTransition,
    }),
  )
  const [price, setPrice] = useQueryState(
    'p',
    filtersSearchParams.p.withOptions({
      shallow: false,
      startTransition,
    }),
  )
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    filtersSearchParams.q.withOptions({
      shallow: false,
      startTransition,
    }),
  )
  const [sorting, setSorting] = useQueryState(
    's',
    filtersSearchParams.s.withOptions({
      shallow: false,
      startTransition,
    }),
  )

  const [localPrice, setLocalPrice] = useState(price)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const debouncedSetPrice = useMemo(
    () =>
      debounce((value: typeof price) => {
        void setPrice(value)
      }, 600),
    [setPrice],
  )

  useEffect(() => {
    if (price[0] !== localPrice[0] || price[1] !== localPrice[1]) {
      debouncedSetPrice(localPrice)
    }

    return () => {
      debouncedSetPrice.cancel()
    }
  }, [localPrice, price, debouncedSetPrice])

  useEffect(() => {
    void setSearchQuery(localSearchQuery)
  }, [subcategory, difficulty, price, sorting])

  return (
    <section className="flex justify-center align-center p-6">
      <div className="hidden lg:block lg:min-w-[220px]">
        <div className="pb-6">
          <span>
            <TourSortButton sortingState={{ sorting, setSorting }} />
          </span>
        </div>
        <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
          {filters.SUBCATEGORIES.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => {
                  void setSubcategory(category.name)
                }}
                className={cn(
                  'opacity-100 cursor-pointer',
                  subcategory === category.name &&
                    'opacity-60 cursor-not-allowed',
                )}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
        <Accordion type="multiple" className="animate-none">
          <AccordionItem value="difficulty">
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
              <span className="font-medium text-gray-900">Difficulty</span>
            </AccordionTrigger>
            <AccordionContent className="pt-6 animate-none">
              <ul className="space-y-4">
                {filters.DIFFICULTY_FILTERS.options.map((option, optionIdx) => (
                  <li key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={difficulty.includes(option.value)}
                      id={`difficulty-${optionIdx}`}
                      onChange={() => {
                        void setDifficulty((prev) => {
                          if (prev.includes(option.value)) {
                            return prev.filter((item) => item !== option.value)
                          }

                          return [...prev, option.value]
                        })
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`difficulty-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple" className="animate-none">
          <AccordionItem value="price">
            <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
              <span className="font-medium text-gray-900">Price</span>
            </AccordionTrigger>
            <AccordionContent className="pt-6 animate-none">
              <ul className="space-y-4">
                {filters.PRICE_FILTERS.options.map((option, optionIdx) => (
                  <li key={option.label} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${optionIdx}`}
                      checked={
                        localPrice[0] === option.value[0] &&
                        localPrice[1] === option.value[1]
                      }
                      onChange={() => {
                        setLocalPrice(option.value as [number, number])
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`price-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
                <li className="mt-4">
                  <div className="flex justify-between m-4">
                    <p className="font-medium">Price Range</p>
                    <div>
                      {localPrice[0]} $ - {localPrice[1]} $
                    </div>
                  </div>
                  <Slider
                    value={localPrice}
                    min={filters.minPrice}
                    max={filters.maxPrice}
                    step={5}
                    onValueChange={(range) => {
                      const [newMin, newMax] = range
                      setLocalPrice([newMin, newMax])
                    }}
                    className="cursor-pointer"
                  />
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex-1 lg:pl-10">
        <div className="mb-4">
          <TourSearchBar
            searchQueryState={{ searchQuery, setSearchQuery }}
            localSearchQueryState={{ localSearchQuery, setLocalSearchQuery }}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, idx) =>
            isPending ? (
              <TourCardFallback key={tour.id} />
            ) : (
              <TourCard
                key={tour.id}
                {...tour}
                bookingsAmount={bookingsAmount[idx]}
              />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
