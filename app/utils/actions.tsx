'use server'
 
import { cookies } from 'next/headers'

export async function create(data : string) {
  const cookieStore = await cookies()
  cookieStore.set('name', 'lee', { secure: true })
}