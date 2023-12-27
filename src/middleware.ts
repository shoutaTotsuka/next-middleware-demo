import { NextResponse, type NextRequest, NextFetchEvent } from 'next/server';
import { createClient } from '@vercel/edge-config';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';

const isProduction: boolean = process.env.VERCEL_ENV === 'production';
const ratelimit: Ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const ipConfig = createClient(process.env.EDGE_CONFIG);
  const ip = await ipConfig.getAll<{
    BLACK_LIST: string[],
    WHITE_LIST: string[]
  }>();

  if (ip.BLACK_LIST?.includes(request.ip as string)) {
    return new NextResponse(null, { status: 401 });
  }

  if (isProduction) {
    // プロダクション環境で`/api`に対するレートリミットをかける
    if (request.nextUrl.pathname.startsWith('/api')) {
      const { success, pending, limit, reset, remaining } = await ratelimit.limit(request.ip as string);
      return success ? NextResponse.next()
                     : new NextResponse('Too many requests', { status: 429 });
    }
  } else {
    // プロダクション環境以外ではBasic認証をかける
    const authorizationHeader = request.headers.get('authorization')
    if (authorizationHeader) {
      const basicAuth: string = authorizationHeader.split(' ')[1]
      const [user, password]: string[] = atob(basicAuth).toString().split(':')
      if (user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASS) {
        return NextResponse.next()
      }
    }
    return new NextResponse('Basic Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    })
  }
}
