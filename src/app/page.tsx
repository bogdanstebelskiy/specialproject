import { Hero } from '@/features/home/components/hero'
import { LogoTicker } from '@/features/home/components/logo-ticker'
import { ProductShowcase } from '@/features/home/components/product-showcase'
import { Pricing } from '@/features/home/components/pricing'
import { Testimonials } from '@/features/home/components/testimonials'
import { CallToAction } from '@/features/home/components/call-to-action'
import { Footer } from '@/features/home/components/footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}
