import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@vercel/edge-config';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest) {
  const ipConfig = createClient(process.env.EDGE_CONFIG);
  const ip = await ipConfig.getAll<{
    BLACK_LIST: string[],
    WHITE_LIST: string[]
  }>();

  if (ip.BLACK_LIST?.includes(request.ip as string)) {
    return new NextResponse(null, { status: 401 });
  }

  // プロダクション環境以外ではBasic認証をかける
  if (process.env.VERCEL_ENV !== 'production') {
    const authorizationHeader = request.headers.get('authorization')
    if (authorizationHeader) {
      const basicAuth: string = authorizationHeader.split(' ')[1]
      const [user, password]: string[] = atob(basicAuth).toString().split(':')
      if (user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASS) {
        return NextResponse.next()
      }
    }
    return new Response('Basic Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    })
  }
}