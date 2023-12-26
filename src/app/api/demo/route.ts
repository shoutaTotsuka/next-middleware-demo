import { NextResponse } from 'next/server';

export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://next-middleware-demo.vercel.app, http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: Request) {
  return NextResponse.json(
    { message: 'Hello from `/api/demo`' },
    { status: 200, headers: corsHeaders }
  )
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
