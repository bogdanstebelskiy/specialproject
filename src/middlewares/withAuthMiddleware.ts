import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { CustomMiddleware } from './chain'

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/features/auth/config/routes'
import { getToken } from 'next-auth/jwt'
import { AUTH_SECRET } from '@/lib/env'

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const session = await getToken({
      req: request,
      secret: AUTH_SECRET,
    })

    const { nextUrl } = request
    const isAuthenticated = !!session?.user

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
      return middleware(request, event, response)
    }

    if (isAuthRoute) {
      if (isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return middleware(request, event, response)
    }

    if (!isAuthenticated && !isPublicRoute) {
      return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return middleware(request, event, response)
  }
}
