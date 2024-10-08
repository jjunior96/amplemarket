import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://news.ycombinator.com/');
    const data = await response.text();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
