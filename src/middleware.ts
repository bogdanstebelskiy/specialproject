import { chain } from './middlewares/chain'
import { withAuthMiddleware } from './middlewares/withAuthMiddleware'

export default chain([withAuthMiddleware])

export const config = {
  matcher: [
    // Match everything except:
    // - API routes (/api)
    // - Next.js internals (_next, _vercel)
    // - Static files (like .png, .css, etc.)
    // Still include pages with locale prefixes (e.g., /en, /ua)

    '/((?!api|_next|_vercel|.*\\..*|api/auth).*)',
  ],
}
