import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmbed } from '@/lib/discord/sendContactFormEmbed';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await sendContactFormEmbed(body);

    return NextResponse.json({ status: 200, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);

    return NextResponse.json({ status: 500, message: 'Internal Server Error' }, { status: 500 });
  }
}
