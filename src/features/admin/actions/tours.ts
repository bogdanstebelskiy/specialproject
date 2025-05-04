'use server'

import { db } from '@/lib/db'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { currentRole } from '@/lib/auth'
import { AddTourSchema, EditTourSchema } from '../schemas'

export async function addTour(prevState: unknown, formData: FormData) {
  const userRole = await currentRole()
  if (userRole !== 'ADMIN') return redirect('/')

  const result = AddTourSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors)
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir('public/tours', { recursive: true })
  const imagePath = `/tours/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  )

  await db.tour.create({
    data: {
      isAvailableForBooking: false,
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      price: data.price,
      imagePath,
      totalCapacity: data.totalCapacity,
      departure: data.departure,
      arrival: data.arrival,
    },
  })

  revalidatePath('/')
  revalidatePath('/tours')
  redirect('/admin/tours')
}

export async function updateTour(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const userRole = await currentRole()
  if (userRole !== 'ADMIN') return redirect('/')

  const result = EditTourSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors)
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const tour = await db.tour.findUnique({ where: { id } })

  if (tour == null) return notFound()

  let imagePath = tour.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${tour.imagePath}`)
    imagePath = `/tours/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer()),
    )
  }

  await db.tour.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      price: data.price,
      imagePath,
      totalCapacity: data.totalCapacity,
      departure: data.departure,
      arrival: data.arrival,
    },
  })

  revalidatePath('/')
  revalidatePath('/tours')
  redirect('/admin/tours')
}

export async function toggleTourAvailability(
  id: string,
  isAvailableForBooking: boolean,
) {
  const userRole = await currentRole()
  if (userRole !== 'ADMIN') return redirect('/')

  await db.tour.update({
    where: { id },
    data: { isAvailableForBooking },
  })

  revalidatePath('/')
  revalidatePath('/tours')
}

export async function deleteTour(id: string) {
  const userRole = await currentRole()
  if (userRole !== 'ADMIN') return redirect('/')

  const tour = await db.tour.delete({ where: { id } })

  if (tour == null) return notFound()

  await fs.unlink(`public${tour.imagePath}`)

  revalidatePath('/')
  revalidatePath('/tours')
}
