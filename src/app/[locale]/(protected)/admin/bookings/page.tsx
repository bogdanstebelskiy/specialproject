import { db } from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrency } from '@/lib/formatters'
import { MoreVertical } from 'lucide-react'
import { PageHeader } from '@/features/admin/components/page-header'
import { DeleteDropdownItem } from '@/features/admin/components/bookings/booking-actions'

function getBookings() {
  return db.booking.findMany({
    select: {
      id: true,
      pricePaid: true,
      tour: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default function BookingsPage() {
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <BookingsTable />
    </>
  )
}

async function BookingsTable() {
  const bookings = await getBookings()

  if (bookings.length === 0) return <p>No bookings found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tour</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.tour.name}</TableCell>
            <TableCell>{booking.user.email}</TableCell>
            <TableCell>{formatCurrency(booking.pricePaid / 100)}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropdownItem id={booking.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
