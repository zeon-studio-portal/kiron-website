import setting from "@/config/config.json";
import { getActiveLanguages, getDefaultLanguage } from "@/lib/languageParser";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

// Get active languages and default language from the configuration
const activeLanguages = getActiveLanguages();
let availableLocales = activeLanguages?.map((lang) => lang.languageCode);
const defaultLocale = getDefaultLanguage();

// Function to determine the best locale based on the request
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  if (!languages || !availableLocales) {
    console.error("Error: No languages or available locales found.");
    return undefined;
  }

  const locale = matchLocale(languages, availableLocales, defaultLocale);
  return locale;
}

// Middleware function to handle locale redirection and authentication
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the locale is missing from the URL
  const isLocaleMissing = !availableLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (isLocaleMissing && setting.settings.default_language_in_subdir) {
    const locale = getLocale(request);

    if (locale) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url,
        ),
      );
    }
  }

  // Check for authentication on protected routes
  const isAuthenticated = request.cookies.get("isAuthenticated");
  const protectedRoutes = ["/kiron"];

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware configuration to match paths while ignoring specific directories
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
    "/kiron",
  ],
};
