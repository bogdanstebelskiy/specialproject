import {
  parseAsString,
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
} from 'nuqs/server'
import * as filters from '../constants/filters'

export const filtersSearchParams = {
  // subcategory
  sc: parseAsString,
  // difficulty
  d: parseAsArrayOf(parseAsString, ';').withDefault([]),
  // price
  p: parseAsArrayOf(parseAsInteger, ';').withDefault([
    filters.DEFAULT_CUSTOM_PRICE[0],
    filters.DEFAULT_CUSTOM_PRICE[1],
  ]),
  // sorting
  s: parseAsString.withDefault(filters.SORT_OPTIONS[0].value),
  // searchQuery
  q: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(filtersSearchParams)
