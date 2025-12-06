import { cookies } from "next/headers"

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale');
  return locale?.value ?? 'fr'
}