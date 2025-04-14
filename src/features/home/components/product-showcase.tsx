'use client'

import productImage from '@/assets/product-image.png'
import pyramidImage from '@/assets/pyramid.png'
import tubeImage from '@/assets/tube.png'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

export const ProductShowcase = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150])

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#E9E9E9] py-24 overflow-x-clip"
    >
      <div className="section-container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Join Us Today!</div>
          </div>
          <h2 className="section-title mt-5">
            Ready to embark on your next adventure?
          </h2>
          <p className="section-description mt-5">
            Browse our hiking tours and find the perfect journey for you. We’re
            your partners in exploration. Let’s make unforgettable memories
            together!
          </p>
        </div>
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      src={productImage}
                      alt="Product Image"
                      className="mt-10"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <motion.img
            src={pyramidImage.src}
            alt="Pyramid Image"
            height={262}
            width={262}
            className="hidden md:block absolute -right-36 -top-32"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={tubeImage.src}
            alt="Tube image"
            height={248}
            width={248}
            className="hidden md:block absolute bottom-24 -left-36 "
            style={{
              translateY,
            }}
          />
        </div>
      </div>
    </section>
  )
}
