export const SORT_OPTIONS = [
  //{ name: "None", value: "none" },
  { name: 'Price: Low to High', value: 'asc' },
  { name: 'Price: High to Low', value: 'desc' },
] as const

export const DIFFICULTY_FILTERS = {
  id: 'difficulty',
  name: 'Difficulty',
  options: [
    { value: 'easy', label: 'Easy' },
    { value: 'middle', label: 'Middle' },
    { value: 'hard', label: 'Hard' },
  ],
} as const

export const CAPACITY_FILTERS = {
  id: 'capacity',
  name: 'Capacity',
  options: [
    {
      value: [0, 10],
      label: 'Ten people',
    },
    {
      value: [0, 20],
      label: 'Twenty people',
    },
    {
      value: [0, 30],
      label: 'Thirty people',
    },
    // custom option defined in JSX
  ],
} as const

export const PRICE_FILTERS = {
  id: 'price',
  name: 'Price',
  options: [
    {
      value: [0, 100],
      label: 'Any price',
    },
    {
      value: [0, 50],
      label: 'Under 5000 UAH',
    },
    {
      value: [0, 20],
      label: 'Under 2000 UAH',
    },
  ],
} as const

export const SUBCATEGORIES = [
  { name: 'One day tours', selected: true, href: '#' },
  { name: 'Two day tours', selected: false, href: '#' },
  { name: 'Three or more day tours', selected: false, href: '#' },
] as const

export const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number]

export const minPrice = Math.min(
  DEFAULT_CUSTOM_PRICE[0],
  DEFAULT_CUSTOM_PRICE[1],
)
export const maxPrice = Math.max(
  DEFAULT_CUSTOM_PRICE[0],
  DEFAULT_CUSTOM_PRICE[1],
)
