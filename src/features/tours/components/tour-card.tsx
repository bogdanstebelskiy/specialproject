import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Tour /*Difficulty*/ } from '@prisma/client'
import { formatCurrency } from '@/lib/formatters'

/*type TourCardProps = {
  id: string;
  name: string;
  difficulty: Difficulty;
  price: number;
  description: string;
  imagePath: string;
  totalCapacity: number;
  bookingsAmount: number;
};*/

type TourCardProps = Partial<Tour> & { bookingsAmount?: number }

export function TourCard({
  id,
  name,
  difficulty,
  price,
  description,
  imagePath,
  totalCapacity,
  bookingsAmount,
}: TourCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col relative">
      <Badge
        className="absolute z-10 top-1 right-1 cursor-default"
        variant={
          difficulty === 'HARD'
            ? 'hard'
            : difficulty === 'MIDDLE'
              ? 'middle'
              : 'easy'
        }
      >
        {difficulty}
      </Badge>
      <div className="relative w-full h-auto aspect-video">
        <Image
          src={imagePath || '/placeholder-image.png'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={name || 'placeholder'}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base md:text-2xl">
          <Link href={`/tours/${id}/book`}>{name}</Link>
        </CardTitle>
        <CardDescription>{formatCurrency((price || 0) / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm md:text-base flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardContent className="text-sm md:text-base flex-grow">
        <p className="line-clamp-4">
          {bookingsAmount} / {totalCapacity}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full text-xs md:text-base">
          <Link href={`/tours/${id}/book`}>Book</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function TourCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        {/*<CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>*/}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}

export function TourCardFallback() {
  return (
    <>
      <TourCardSkeleton />
      <TourCardSkeleton />
      <TourCardSkeleton />
      <TourCardSkeleton />
      <TourCardSkeleton />
      <TourCardSkeleton />
    </>
  )
}
