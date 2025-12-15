import { register } from '@/lib/api/NewsLetter';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const response = await register(body.data.email, body.data.news, body.data.offers);

    if (!response.ok)
        return NextResponse.json({ text: await response.text() }, { status: response.status });
    return NextResponse.json({ status: 200 });
}
