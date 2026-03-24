import Navbar from "./Navbar";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function NavbarWrapper() {
  const dict = await getDictionary();
  const locale = await getLocale();
  return <Navbar dict={dict.nav} currentLocale={locale} />;
}
