import { NextResponse } from 'next/server';

// In-memory storage for sentiment data
let sentimentData = [];

export async function GET() {
  return NextResponse.json(sentimentData);
}

export async function POST(request) {
  const data = await request.json();
  sentimentData.push(data);
  // Keep only the last 100 entries to prevent memory issues
  if (sentimentData.length > 100) {
    sentimentData = sentimentData.slice(-100);
  }
  return NextResponse.json({ success: true });
} 