import { NextResponse } from 'next/server';

// In-memory storage for sentiment data
let sentimentData = [];

export async function GET() {
  return NextResponse.json(sentimentData);
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate the incoming data
    if (!data.title || !data.date || typeof data.sentiment !== 'number') {
      return NextResponse.json(
        { error: 'Invalid data format. Expected {title, date, sentiment}' },
        { status: 400 }
      );
    }

    sentimentData.push({
      title: data.title,
      date: data.date,
      sentiment: data.sentiment
    });

    // Keep only the last 100 entries to prevent memory issues
    if (sentimentData.length > 100) {
      sentimentData = sentimentData.slice(-100);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process data' },
      { status: 500 }
    );
  }
}