import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const user = await currentUser()

  if (user?.role !== 'ADMIN') redirect('/')

  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip">
      <div className="section-container border-2 rounded-md pt-4 bg-stone-50">
        <div className="flex justify-center items-center">
          <nav className="flex flex-wrap wrap justify-center items-center">
            <Link href="/admin" className="m-2">
              <Button variant="default" className="w-[120px]">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/tours" className="m-2">
              <Button variant="default" className="w-[120px]">
                Tours
              </Button>
            </Link>
            <Link href="/admin/users" className="m-2">
              <Button variant="default" className="w-[120px]">
                Customers
              </Button>
            </Link>
            <Link href="/admin/bookings" className="m-2">
              <Button variant="default" className="w-[120px]">
                Bookings
              </Button>
            </Link>
          </nav>
        </div>

        <div className="mt-6 mb-6">{children}</div>
      </div>
    </section>
  )
}
