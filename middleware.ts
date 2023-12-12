import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/api/translate'],
}

export default async function middleware(request: NextRequest, event: NextFetchEvent): Promise<Response | undefined> {
  return NextResponse.next()
}
