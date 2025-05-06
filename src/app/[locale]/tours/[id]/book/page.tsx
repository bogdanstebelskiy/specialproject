import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'
import { CheckoutForm } from '@/features/tours/components/checkout-form'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  const { id } = params

  const tour = await db.tour.findUnique({
    where: { id },
  })
  if (tour == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: tour.price,
    currency: 'USD',
    metadata: { productId: tour.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error('Stripe failed to create payment intent')
  }

  return <CheckoutForm tour={tour} clientSecret={paymentIntent.client_secret} />
}
