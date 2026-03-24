'use server'

import { cookies } from 'next/headers';

export async function setLanguage(locale: 'en' | 'id') {
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, { path: '/' });
}
