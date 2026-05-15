import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/*
  WHY THIS MIDDLEWARE EXISTS
  ─────────────────────────────────────────────────────────────
  Supabase SSR sessions are stored in cookies. The session
  token has a short expiry and must be refreshed on every
  request. Without this middleware:

  1. User logs in → callback sets cookie → redirect to /dashboard
  2. /dashboard server component reads cookie → session EXPIRED
     or not yet propagated → redirects back to /login
  3. User hits /login again → cookie now readable → works

  This middleware runs before every request, refreshes the
  session if needed, and writes the updated cookie back so
  server components always see a valid session.

  PROTECTED ROUTES
  ─────────────────────────────────────────────────────────────
  Add any route that requires auth to the `protectedPaths`
  array. The middleware will redirect unauthenticated users
  to /login, preserving the intended destination in `next`.
*/

const protectedPaths = ['/dashboard', '/course']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Start with a plain pass-through response
    let response = NextResponse.next({
        request: { headers: request.headers },
    })

    // Create a Supabase client wired to the middleware
    // request/response so it can read and write cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    // Write cookies to the outgoing request headers
                    // so server components in this request can read them
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    // Re-create the response so we can set cookies on it
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    // Write cookies to the response so the browser
                    // stores them for subsequent requests
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: always call getUser() — never getSession().
    // getSession() reads from the cookie only and can be spoofed.
    // getUser() validates the token with Supabase's servers.
    const { data: { user } } = await supabase.auth.getUser()

    // Protect routes — redirect to login if not authenticated
    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
    )

    if (isProtected && !user) {
        const loginUrl = new URL('/login', request.url)
        // Preserve where they were trying to go
        loginUrl.searchParams.set('next', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Redirect authenticated users away from /login
    if (pathname === '/login' && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
          Run on all paths EXCEPT:
          - _next/static  (static files)
          - _next/image   (image optimisation)
          - favicon.ico
          - public assets (png, svg, jpg, etc.)
        */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}