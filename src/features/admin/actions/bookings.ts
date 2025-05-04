"use server";

import { notFound, redirect } from "next/navigation";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";

export async function deleteBooking(id: string) {
  const userRole = await currentRole();
  if (userRole !== "ADMIN") return redirect("/");

  const order = await db.booking.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}
