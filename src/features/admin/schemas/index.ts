import * as z from 'zod'
import { Difficulty } from '@prisma/client'

export const FileSchema = z.instanceof(File, { message: 'Required' })
export const ImageSchema = FileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/'),
)

export const AddTourSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  totalCapacity: z.coerce.number().min(1).max(50),
  image: ImageSchema.refine((file) => file.size > 0, 'Required'),
  difficulty: z.enum([Difficulty.EASY, Difficulty.MIDDLE, Difficulty.HARD]),
  departure: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()), // Check if it's a valid date
      { message: 'Invalid date format' },
    )
    .refine((value) => new Date(value) > new Date(), {
      message: 'Invalid date in the past',
    })
    .transform((value) => new Date(value).toISOString()), // Convert to ISO 8601
  arrival: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()), // Check if it's a valid date
      { message: 'Invalid date format' },
    )
    .refine((value) => new Date(value) > new Date(), {
      message: 'Invalid date in the past',
    })
    .transform((value) => new Date(value).toISOString()), // Convert to ISO 8601
})

export const EditTourSchema = AddTourSchema.extend({
  image: ImageSchema.optional(),
})
