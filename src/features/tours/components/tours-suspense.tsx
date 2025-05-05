import { TourCard } from "./tour-card";

// TODO: specify tours type

type ToursSuspenseProps = {
  //isPending: boolean;
  tours: any;
  bookingsAmount: any;
};

export default function ToursSuspense({
  //isPending,
  tours,
  bookingsAmount,
}: ToursSuspenseProps) {
  return tours.map(
    (tour: any, idx: number) => (
      /*isPending ? (
      <TourCardFallback />
    ) : (
    */
      <TourCard key={tour.id} {...tour} bookingsAmount={bookingsAmount[idx]} />
    ),
    //),
  );
}
