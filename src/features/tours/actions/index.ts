import { db } from "@/lib/db";
import { Difficulty, Prisma } from "@prisma/client";

export function getTours() {
  return db.tour.findMany({
    where: {
      isAvailableForBooking: true,
    },
    orderBy: { name: "asc" },
  });
}

type GetFilteredToursArgs = {
  difficulty?: Difficulty[];
  price?: [number, number];
  searchQuery?: string;
  sort?: {
    sortField: "name" | "price" | "difficulty";
    sortOrder: Prisma.SortOrder;
  };
};

export function getFilteredTours({
  sort,
  difficulty,
  price,
  searchQuery,
}: GetFilteredToursArgs) {
  return db.tour.findMany({
    where: {
      difficulty:
        difficulty && difficulty.length > 0
          ? {
              in: difficulty,
            }
          : undefined,

      price: price
        ? {
            gte: price[0],
            lte: price[1],
          }
        : undefined,

      OR: searchQuery
        ? [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: sort
      ? {
          [sort.sortField]: sort.sortOrder,
        }
      : undefined,
  });
}

// make order type stronger
export function getOrderedTours(order: string) {
  const validOrder = order === "asc" || order === "desc" ? order : "asc";

  /*return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(
        db.tour.findMany({
          where: {
            isAvailableForBooking: true,
          },
          orderBy: { name: validOrder },
        }),
      );
    }, 1500);
  });*/

  return db.tour.findMany({
    where: {
      isAvailableForBooking: true,
    },
    orderBy: { name: validOrder },
  });
}
