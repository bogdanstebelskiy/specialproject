'use client'

import { useTransition } from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function LocaleSwitcherSelect() {
  const locales = routing.locales
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Select value={locale} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[40px] border-none focus:ring-0 focus:ring-offset-0 [&_svg]:hidden">
        <SelectValue placeholder={locale} />
      </SelectTrigger>
      <SelectContent className="min-w-0">
        {locales.map((cur) => (
          <SelectItem key={cur} value={cur} className="[&_svg]:hidden">
            {t('locale', { locale: cur })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
