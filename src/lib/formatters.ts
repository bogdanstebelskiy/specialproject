const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en', { dateStyle: 'full' })

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date)
}

// TODO: fix formating function
export function formatDateTimeLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1)
}
