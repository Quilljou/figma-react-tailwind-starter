import { NextResponse as Response } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405,
    })
  }

  try {
    return Response.json({
      price: 9900,
    })
  } catch (err: any) {
    console.log(err)
    return new Response(JSON.stringify({ error: { statusCode: 500, type: err?.type, message: err?.message } }), {
      status: 500,
    })
  }
}
