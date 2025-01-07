'use server'
 
import { cookies } from 'next/headers'

export async function createCookie(data : string) {
  const cookieStore = await cookies()
  cookieStore.set('name', data, { secure: true })
}

export async function deleteCookie(name : string) {
  (await cookies()).delete(name)
}

export async function clearLikes()
{
  return null;
}