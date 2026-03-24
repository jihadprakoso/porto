import { cookies } from 'next/headers';
import en from '@/i18n/en.json';
import id from '@/i18n/id.json';

export type Locale = 'en' | 'id';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value as Locale;
  return locale === 'id' ? 'id' : 'en';
}

export async function getDictionary() {
  const locale = await getLocale();
  return locale === 'id' ? id : en;
}
