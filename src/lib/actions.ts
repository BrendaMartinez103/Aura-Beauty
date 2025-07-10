'use server'

import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { v2 as cloudinary } from 'cloudinary'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

/* Uploads an image to Cloudinary and returns the secure URL.*/
export async function uploadImageToCloudinary(
  file: File,
  folder?: string
): Promise<Record<string, string>> {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mimeType = file.type
  const base64 = buffer.toString('base64')
  const dataUri = `data:${mimeType};base64,${base64}`

  const res = await cloudinary.uploader.upload(dataUri, {
    folder: folder || 'default',
    resource_type: 'image',
  })

  return res
}
