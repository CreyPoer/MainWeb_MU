import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from './i18n.config';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip internal paths and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.') // static files
    ) {
        return NextResponse.next();
    }

    // Check if the pathname already has a locale prefix
    const pathnameHasLocale = i18nConfig.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${i18nConfig.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
};
