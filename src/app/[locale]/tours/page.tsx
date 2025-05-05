import { cache } from '@/lib/cache'
import TourFilters from '@/features/tours/components/tour-filters'
import { SearchParams } from 'nuqs/server'
import { loadSearchParams } from '@/features/tours/config/searchParams'
import { getFilteredTours } from '@/features/tours/actions'
import { getBookingsAmount } from '@/features/bookings/actions'
import { Difficulty, Prisma } from '@prisma/client'

/*const getProducts = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);*/

type TourProps = {
  searchParams: Promise<SearchParams>
}

export default async function ToursPage(props: TourProps) {
  const searchParams = await props.searchParams
  const {
    sc: subcategory,
    d: difficulty,
    p: price,
    s: sorting,
    q: searchQuery,
  } = loadSearchParams(searchParams)
  const tours = await getFilteredTours({
    sort: {
      sortField: 'name',
      sortOrder: sorting as Prisma.SortOrder,
    },
    difficulty:
      (difficulty.map((e) => e.toUpperCase()) as Difficulty[]) || undefined,
    price: price.length === 2 ? [price[0], price[1]] : undefined,
    searchQuery: searchQuery || undefined,
  })

  //if (tours.length === 0) return <p>No tours available!</p>;

  const bookingsAmount = await Promise.all(
    tours.map((tour) => getBookingsAmount(tour.id)),
  )

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Best Ukrainian tour selection
        </h1>
      </div>
      <TourFilters tours={tours} bookingsAmount={bookingsAmount} />
    </main>
  )
}
