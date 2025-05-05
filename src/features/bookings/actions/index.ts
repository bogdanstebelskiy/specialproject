"use server";

import { db } from "@/lib/db";

export async function userBookingExists(email: string, tourId: string) {
  return (
    (await db.booking.findFirst({
      where: {
        user: { email },
        tourId,
      },
      select: { id: true },
    })) != null
  );
}

export async function getBookingsAmount(tourId: string) {
  return db.booking.count({
    where: {
      id: tourId,
    },
  });
}
