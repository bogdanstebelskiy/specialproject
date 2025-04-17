'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import cogImage from '@/assets/cog.png'
import cylinderImage from '@/assets/cylinder.png'
import noodleImage from '@/assets/noodle.png'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export const Hero = () => {
  const t = useTranslations('Home')

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-gradient-hero overflow-x-clip"
    >
      <div className="section-container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">Soon Somewhere</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#595959] text-transparent bg-clip-text mt-6">
              {t('title')}
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Welcome to Special Project, your gateway to unforgettable hiking
              experiences across the breathtaking landscapes of Ukraine!
            </p>
            <div className="flex gap-2 items-center mt-[30px]">
              <Link href="/tours">
                <Button>Start adventure</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="gap-1">
                  <span>Learn more</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={cogImage.src}
              alt="Cog Image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3,
                ease: 'easeInOut',
              }}
            />
            <motion.img
              src={cylinderImage.src}
              width={220}
              height={220}
              alt="Cylinder Image"
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{
                translateY,
              }}
            />
            <motion.img
              src={noodleImage.src}
              width={220}
              alt="Noodle Image"
              className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"
              style={{
                rotate: 30,
                translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
