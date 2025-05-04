"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export async function deleteUser(id: string) {
  const userRole = await currentRole();
  if (userRole !== "ADMIN") return redirect("/");

  const user = await db.user.delete({
    where: { id },
  });

  if (user == null) return notFound();

  return user;
}
