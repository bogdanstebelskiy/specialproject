import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Logo from '@/assets/logo_red.svg'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { UserButton } from './user-button'
import LocaleSwitcherSelect from './locale-switcher-select'
import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function UserNavbar() {
  const user = await currentUser()
  const locale = await getLocale()

  return (
    <nav className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-5">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-10">
              <Link href="/public" locale={locale}>
                <Logo height={60} width={60} />
              </Link>
            </div>
            <HamburgerMenuIcon className="h-5 w-5 md:hidden text-black" />
            <div className="hidden md:flex gap-6 text-link items-center">
              <Link href="/about" locale={locale}>
                About
              </Link>
              <Link href="/tours" locale={locale}>
                Tours
              </Link>
              <Link href="/help" locale={locale}>
                Help
              </Link>
              <LocaleSwitcherSelect />
              <Button
                size="lg"
                className="px-4 py-2 text-md tracking-tight"
                asChild
              >
                {!user ? (
                  <Link href="/auth/login" locale={locale}>
                    Log in
                  </Link>
                ) : (
                  <UserButton />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
