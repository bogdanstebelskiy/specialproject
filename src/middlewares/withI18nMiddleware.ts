import createMiddleware from 'next-intl/middleware'
import { CustomMiddleware } from './chain'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

/*const i18nMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ua"],

  // Used when no locale matches
  defaultLocale: "en",
});*/

const i18nMiddleware = createMiddleware(routing)

export function withI18nMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    //const { pathname } = request.nextUrl;

    // Exclude adding localization prefix for api routes
    /*if (pathname.startsWith("/api")) {
      return middleware(request, event, response);
    }*/

    const i18nResponse = i18nMiddleware(request)

    if (i18nResponse) {
      return i18nResponse
    }

    return middleware(request, event, response)
  }
}
